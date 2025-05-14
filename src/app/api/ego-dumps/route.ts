import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dumps = await prisma.egoDump.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    return NextResponse.json(
      dumps.map(dump => ({
        id: dump.id,
        content: dump.content,
        timestamp: dump.createdAt,
        likes: dump.likes,
        comments: dump._count.comments,
      }))
    );
  } catch (error) {
    console.error('Failed to fetch dumps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dumps' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    const dump = await prisma.egoDump.create({
      data: {
        content,
        likes: 0,
      },
    });

    return NextResponse.json({
      id: dump.id,
      content: dump.content,
      timestamp: dump.createdAt,
      likes: dump.likes,
      comments: 0,
    });
  } catch (error) {
    console.error('Failed to create dump:', error);
    return NextResponse.json(
      { error: 'Failed to create dump' },
      { status: 500 }
    );
  }
} 