import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// In a real application, these would come from a database
// For now, we'll use mock data
const stats = {
  totalRoasts: 1234,
  activeUsers: 567,
  successStories: 89
};

export async function GET() {
  try {
    // In a real application, you would:
    // 1. Query your database for actual stats
    // 2. Cache the results to avoid hitting the database on every request
    // 3. Update the stats periodically (e.g., every hour)
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 