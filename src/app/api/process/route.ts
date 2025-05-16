import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { vcPrompts } from '@/lib/vcPrompts';
import { Redis } from '@upstash/redis';
import { logger } from '@/lib/logger';
import pdfParse from 'pdf-parse';

// Initialize Redis with error handling
let redis: Redis | null = null;
try {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    logger.warn('Redis credentials not found, caching will be disabled');
  } else {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch (error) {
  logger.error('Failed to initialize Redis', { error });
}

// Initialize OpenAI with error handling
let openai: OpenAI | null = null;
try {
  if (!process.env.OPENAI_API_KEY) {
    logger.error('OpenAI API key not found');
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
} catch (error) {
  logger.error('Failed to initialize OpenAI', { error });
}

// Map old VC IDs to new IDs in vcPrompts
const idMap: Record<string, string> = {
  sequoia: 'jean-de-la-rochebrochard',
  andreessen: 'alice-zagury',
  accel: 'marie-ekeland',
  yc: 'nicolas-debock',
  // Add more mappings as needed
};

// Cache TTL in seconds
const CACHE_TTL = 3600; // 1 hour

// Performance logging
const logApiPerformance = (startTime: number, operation: string) => {
  const duration = Date.now() - startTime;
  logger.info(`API ${operation} took ${duration}ms`);
};

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI service is not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const vcId = formData.get('vcId') as string;
    const roastIntensity = formData.get('roastIntensity') as 'gentle' | 'balanced' | 'brutal';

    if (!file || !vcId) {
      logApiPerformance(startTime, 'validation');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate cache key
    const cacheKey = `feedback:${vcId}:${roastIntensity}:${file.name}`;

    // Check cache first if Redis is available
    if (redis) {
      const cachedResult = await redis.get(cacheKey);
      if (cachedResult) {
        logApiPerformance(startTime, 'cache_hit');
        return NextResponse.json({
          status: 'complete',
          result: JSON.parse(cachedResult as string)
        }, {
          headers: {
            'Cache-Control': 'public, max-age=3600',
            'X-Cache': 'HIT'
          }
        });
      }
    }

    // Find the selected VC
    const selectedVC = vcPrompts.find(vc => vc.id === vcId);
    if (!selectedVC) {
      logApiPerformance(startTime, 'vc_not_found');
      return NextResponse.json(
        { error: 'Invalid VC selected' },
        { status: 400 }
      );
    }

    // Process the file and generate feedback
    const feedback = await generateFeedback(file, selectedVC, roastIntensity);

    const result = {
      success: true,
      feedback,
      vc: selectedVC,
      roastIntensity
    };

    // Cache the result if Redis is available
    if (redis) {
      await redis.set(cacheKey, JSON.stringify(result), { ex: CACHE_TTL });
    }

    logApiPerformance(startTime, 'success');
    return NextResponse.json({
      status: 'complete',
      result
    }, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    logApiPerformance(startTime, 'error');
    logger.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

async function generateFeedback(
  file: File,
  vc: typeof vcPrompts[0],
  intensity: 'gentle' | 'balanced' | 'brutal'
) {
  const startTime = Date.now();
  try {
    // Only support PDF for now
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are supported at this time.');
    }

    if (!openai) {
      throw new Error('OpenAI service is not configured');
    }

    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract text from PDF
    const pdfData = await pdfParse(buffer);
    const extractedText = pdfData.text;

    // Compose the prompt for GPT
    const prompt = `${vc.prompt}\n\nHere is the pitch deck content (as extracted text):\n\n${extractedText}\n\nPlease provide your brutally honest feedback as a VC, in a structured and actionable way. Roast intensity: ${intensity}.`;

    // Call OpenAI GPT-4
    const completion = await openai.chat.completions.create({
      model: vc.model || 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a brutally honest venture capitalist giving feedback on startup pitch decks.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const feedbackText = completion.choices[0]?.message?.content || 'No feedback generated.';

    logApiPerformance(startTime, 'feedback_generation');
    return {
      summary: `Feedback from ${vc.name} (${intensity} intensity)`,
      points: [feedbackText]
    };
  } catch (error) {
    logApiPerformance(startTime, 'feedback_error');
    logger.error('Error generating feedback:', error);
    throw error;
  }
} 