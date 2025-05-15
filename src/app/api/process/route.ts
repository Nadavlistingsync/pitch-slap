import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { vcPrompts } from '@/lib/vcPrompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Map old VC IDs to new IDs in vcPrompts
const idMap: Record<string, string> = {
  sequoia: 'jean-de-la-rochebrochard',
  andreessen: 'alice-zagury',
  accel: 'marie-ekeland',
  yc: 'nicolas-debock',
  // Add more mappings as needed
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const vcId = formData.get('vcId') as string;
    const roastIntensity = formData.get('roastIntensity') as 'gentle' | 'balanced' | 'brutal';

    if (!file || !vcId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the selected VC
    const selectedVC = vcPrompts.find(vc => vc.id === vcId);
    if (!selectedVC) {
      return NextResponse.json(
        { error: 'Invalid VC selected' },
        { status: 400 }
      );
    }

    // Process the file and generate feedback based on roast intensity
    // This is where you would integrate with your AI service
    const feedback = await generateFeedback(file, selectedVC, roastIntensity);

    return NextResponse.json({
      success: true,
      feedback,
      vc: selectedVC,
      roastIntensity
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}

async function generateFeedback(
  file: File,
  vc: typeof vcPrompts[0],
  intensity: 'gentle' | 'balanced' | 'brutal'
) {
  // This is a placeholder for the actual AI integration
  // You would implement the actual file processing and feedback generation here
  return {
    summary: `Feedback from ${vc.name} (${intensity} intensity)`,
    points: [
      'Market size needs to be more realistic',
      'Team slide is strong',
      'Unit economics need improvement',
      'Go-to-market strategy needs more detail'
    ]
  };
} 