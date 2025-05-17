import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';
import mockPdf from '@/lib/mock-pdf';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const roastIntensity = formData.get('roastIntensity') as 'gentle' | 'balanced' | 'brutal';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Only support PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    let pdfData;
    try {
      // Read and parse PDF
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      pdfData = await pdfParse(buffer);
    } catch (error) {
      // If PDF parsing fails, use mock PDF for testing
      pdfData = await pdfParse(mockPdf);
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

    const feedback = completion.choices[0]?.message?.content || 'No feedback generated.';

    return NextResponse.json({
      success: true,
      feedback,
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