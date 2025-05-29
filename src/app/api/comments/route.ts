import { NextResponse } from 'next/server';

// In-memory storage for comments (replace with a database in production)
let comments: any[] = [];

export async function GET() {
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const comment = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    };
    
    comments.unshift(comment);
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
} 