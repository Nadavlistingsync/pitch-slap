import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Validate roast intensity
const isValidRoastIntensity = (intensity: string): intensity is 'gentle' | 'balanced' | 'brutal' => {
  return ['gentle', 'balanced', 'brutal'].includes(intensity);
};

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const roastIntensity = formData.get('roastIntensity') as string;

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!isValidRoastIntensity(roastIntensity)) {
      console.error('Invalid roast intensity:', roastIntensity);
      return NextResponse.json(
        { error: 'Invalid roast intensity. Must be one of: gentle, balanced, brutal' },
        { status: 400 }
      );
    }

    // Only support PDF
    if (file.type !== 'application/pdf') {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Read and parse PDF
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const pdfData = await pdfParse(buffer);
      
      if (!pdfData || !pdfData.text) {
        throw new Error('Failed to extract text from PDF');
      }
      
      const extractedText = pdfData.text;

      // Generate roast using GPT
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { 
            role: 'system', 
            content: 'You are a brutally honest venture capitalist giving feedback on startup pitch decks. Be direct, critical, and provide actionable feedback.' 
          },
          { 
            role: 'user', 
            content: `Here is the pitch deck content:\n\n${extractedText}\n\nPlease provide your brutally honest feedback as a VC. Roast intensity: ${roastIntensity}.` 
          }
        ],
        max_tokens: 800,
        temperature: 0.7
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No response generated from OpenAI');
      }

      const feedback = completion.choices[0].message.content;

      return NextResponse.json({
        success: true,
        feedback,
        roastIntensity
      });

    } catch (pdfError) {
      console.error('Error processing PDF:', pdfError);
      return NextResponse.json(
        { error: 'Failed to process PDF file' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in /api/process:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 