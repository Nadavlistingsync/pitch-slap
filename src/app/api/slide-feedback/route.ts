import { NextResponse } from 'next/server';
import { prisma, executeQuery } from '@/lib/db';
import { Redis } from '@upstash/redis';
import { logger } from '@/lib/logger';

// Initialize Redis with error handling
let redis: Redis | null = null;
try {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    logger.warn('Redis credentials not found, caching will be disabled');
  } else {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
      automaticDeserialization: false,
    });
  }
} catch (error) {
  logger.error('Failed to initialize Redis', { error });
}

const CACHE_TTL = 1800; // 30 minutes
const BATCH_SIZE = 50;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slideNumber, content, rating, comments, deckId, brutalityLevel } = body;

    logger.info('Received feedback submission', {
      slideNumber,
      deckId,
      brutalityLevel,
      rating,
      hasComments: !!comments
    });

    // Use a transaction for better performance
    if (!prisma) {
      logger.error('Prisma client is not initialized');
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }
    const feedback = await prisma.$transaction(async (tx) => {
      logger.debug('Starting database transaction for feedback submission');
      
      const result = await tx.slideFeedback.create({
        data: {
          slideNumber,
          content,
          rating,
          comments,
          deckId,
          brutalityLevel,
        },
      });

      logger.debug('Feedback record created', { feedbackId: result.id });

      // Update deck's last modified timestamp
      await tx.deck.update({
        where: { id: deckId },
        data: { updatedAt: new Date() },
      });

      logger.debug('Deck timestamp updated', { deckId });
      return result;
    });

    // Invalidate cache for this deck if Redis is available
    if (redis) {
      await redis.del(`feedback:deck:${deckId}`);
      logger.debug('Cache invalidated', { deckId });
    }

    logger.info('Feedback submission completed successfully', { feedbackId: feedback.id });
    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    logger.error('Error submitting feedback', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const deckId = searchParams.get('deckId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    logger.info('Fetching feedback', {
      deckId,
      page,
      limit,
      skip
    });

    // Generate cache key with version
    const cacheKey = `feedback:deck:${deckId}:page:${page}:limit:${limit}:v1`;

    // Check cache first if Redis is available
    if (redis) {
      const pipeline = redis.pipeline();
      pipeline.get(cacheKey);
      pipeline.ttl(cacheKey);
      const [cachedResult, ttl] = await pipeline.exec();

      if (cachedResult) {
        logger.debug('Cache hit for feedback query', { cacheKey, ttl });
        return NextResponse.json(JSON.parse(cachedResult as string));
      }
    }

    logger.debug('Cache miss, querying database');

    // Use a more efficient query with batch processing
    const [total, feedback] = await Promise.all([
      prisma.slideFeedback.count({
        where: deckId ? { deckId } : undefined,
      }),
      prisma.slideFeedback.findMany({
        where: deckId ? { deckId } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
        select: {
          id: true,
          slideNumber: true,
          content: true,
          rating: true,
          comments: true,
          brutalityLevel: true,
          createdAt: true,
        },
      }),
    ]);

    logger.debug('Database query completed', {
      totalResults: total,
      returnedResults: feedback.length
    });

    const result = {
      feedback,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
    };

    // Cache the result if Redis is available
    if (redis) {
      const cachePipeline = redis.pipeline();
      cachePipeline.set(cacheKey, JSON.stringify(result), { ex: CACHE_TTL });
      cachePipeline.set(`feedback:deck:${deckId}:last-updated`, Date.now(), { ex: CACHE_TTL });
      await cachePipeline.exec();
      logger.debug('Results cached', { cacheKey, ttl: CACHE_TTL });
    }

    return NextResponse.json(result);
  } catch (error) {
    logger.error('Error fetching feedback', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
} 