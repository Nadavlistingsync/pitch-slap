import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roastLevel, vc, content } = body;

    const roast = await prisma.roast.create({
      data: {
        level: roastLevel,
        content,
        vcId: vc.id,
        vcName: vc.name,
        vcFirm: vc.firm,
        vcImage: vc.image,
        vcSpecialties: vc.specialties,
        vcDescription: vc.description
      }
    });

    return NextResponse.json(roast);
  } catch (error) {
    console.error('Error creating roast:', error);
    return NextResponse.json(
      { error: 'Failed to create roast' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const roasts = await prisma.roast.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(roasts);
  } catch (error) {
    console.error('Error fetching roasts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roasts' },
      { status: 500 }
    );
  }
} 