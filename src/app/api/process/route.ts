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
    const roastIntensity = formData.get('roastIntensity') as 'gentle' | 'balanced' | 'brutal';

    if (!file) {
      logApiPerformance(startTime, 'validation');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Only support PDF
    if (file.type !== 'application/pdf') {
      logApiPerformance(startTime, 'validation');
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Read and parse PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);
    const extractedText = pdfData.text;

    // Generate roast using GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { 
          role: 'system', 
          content: 'You are a brutally honest venture capitalist giving feedback on startup pitch decks. Be direct, critical, and provide actionable feedback.' 
        },
        { 
          role: 'user', 
          content: `Here is the pitch deck content:\n\n${extractedText}\n\nPlease provide your brutally honest feedback as a VC. Roast intensity: ${roastIntensity}.` 
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    const feedback = completion.choices[0]?.message?.content || 'No feedback generated.';

    const result = {
      success: true,
      feedback,
      roastIntensity
    };

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