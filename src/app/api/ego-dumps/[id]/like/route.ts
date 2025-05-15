import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const updatedDump = await prisma.egoDump.update({
      where: { id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(updatedDump);
  } catch (error) {
    console.error('Error liking ego dump:', error);
    return NextResponse.json({ error: 'Failed to like ego dump' }, { status: 500 });
  }
} 