import { NextResponse } from 'next/server';
import { getFeedback } from '@/lib/feedback';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store
const feedbackStore = new Map<string, any>();

export async function GET() {
  return new Response('This endpoint is no longer supported.', { status: 410 });
} 