import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const dumps = await prisma.egoDump.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(dumps);
  } catch (error) {
    console.error('Error fetching ego dumps:', error);
    return NextResponse.json({ error: 'Failed to fetch ego dumps' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const dump = await prisma.egoDump.create({
      data: {
        content,
        author: 'Anonymous', // You can modify this to use real user data
        likes: 0,
      },
    });

    return NextResponse.json(dump);
  } catch (error) {
    console.error('Error creating ego dump:', error);
    return NextResponse.json({ error: 'Failed to create ego dump' }, { status: 500 });
  }
} 