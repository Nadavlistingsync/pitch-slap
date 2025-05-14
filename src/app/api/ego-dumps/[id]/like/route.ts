import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const dump = await prisma.egoDump.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ likes: dump.likes });
  } catch (error) {
    console.error('Failed to like dump:', error);
    return NextResponse.json(
      { error: 'Failed to like dump' },
      { status: 500 }
    );
  }
} 