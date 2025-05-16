import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { vcPrompts } from '@/lib/vcPrompts';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
  console.log(`API ${operation} took ${duration}ms`);
};

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
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

    // Check cache first
    const cachedResult = await redis.get(cacheKey);
    if (cachedResult) {
      logApiPerformance(startTime, 'cache_hit');
      return NextResponse.json(JSON.parse(cachedResult as string), {
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'X-Cache': 'HIT'
        }
      });
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

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(result), { ex: CACHE_TTL });

    logApiPerformance(startTime, 'success');
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'MISS'
      }
    });
  } catch (error) {
    logApiPerformance(startTime, 'error');
    console.error('Error processing file:', error);
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
    // Implement actual file processing and feedback generation here
    // This is a placeholder for the actual implementation
    const feedback = {
      summary: `Feedback from ${vc.name} (${intensity} intensity)`,
      points: [
        'Market size needs to be more realistic',
        'Team slide is strong',
        'Unit economics need improvement',
        'Go-to-market strategy needs more detail'
      ]
    };
    
    logApiPerformance(startTime, 'feedback_generation');
    return feedback;
  } catch (error) {
    logApiPerformance(startTime, 'feedback_error');
    console.error('Error generating feedback:', error);
    throw error;
  }
} 