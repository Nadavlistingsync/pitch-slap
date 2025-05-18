import { NextResponse } from 'next/server';
import { getFeedback } from '@/lib/feedback';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store
const feedbackStore = new Map<string, any>();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feedback = getFeedback(params.id);
    
    if (!feedback) {
      return NextResponse.json(
        { error: 'Feedback not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 