import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const dumps = await prisma.egoDump.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    });

    return NextResponse.json(dumps);
  } catch (error) {
    console.error('Error fetching ego dumps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ego dumps' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content, author } = await req.json();

    const dump = await prisma.egoDump.create({
      data: {
        content,
        author: author || 'Anonymous',
        likes: 0
      }
    });

    return NextResponse.json(dump);
  } catch (error) {
    console.error('Error creating ego dump:', error);
    return NextResponse.json(
      { error: 'Failed to create ego dump' },
      { status: 500 }
    );
  }
} 