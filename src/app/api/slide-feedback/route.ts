import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slideNumber, content, rating, comments, deckId, brutalityLevel } = body;

    const feedback = await prisma.slideFeedback.create({
      data: {
        slideNumber,
        content,
        rating,
        comments,
        deckId,
        brutalityLevel,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Error submitting slide feedback:', error);
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

    const feedback = await prisma.slideFeedback.findMany({
      where: deckId ? { deckId } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching slide feedback:', error);
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    );
  }
} 