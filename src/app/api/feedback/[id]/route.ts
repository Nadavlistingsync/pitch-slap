import { NextResponse } from 'next/server';

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
    const feedback = feedbackStore.get(params.id);
    
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

// Helper function to store feedback (called from the process endpoint)
export function storeFeedback(id: string, feedback: any) {
  feedbackStore.set(id, feedback);
} 