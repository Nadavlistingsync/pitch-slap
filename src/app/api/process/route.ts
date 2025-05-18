import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';
import { realVCPersonalities } from '../../../types/realVCPersonalities';

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

// Validate VC personality
const isValidVCPersonality = (personalityId: string): boolean => {
  return realVCPersonalities.some(p => p.id === personalityId);
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
    const personalityId = formData.get('personality') as string;

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

    if (!isValidVCPersonality(personalityId)) {
      console.error('Invalid VC personality:', personalityId);
      return NextResponse.json(
        { error: 'Invalid VC personality selected' },
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

    // Get selected personality
    const selectedPersonality = realVCPersonalities.find(p => p.id === personalityId);
    if (!selectedPersonality) {
      throw new Error('Selected personality not found');
    }

    // Read and parse PDF
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Configure pdf-parse options to ignore font warnings
      const options = {
        pagerender: function(pageData: any) {
          return pageData.getTextContent()
            .then(function(textContent: any) {
              return textContent.items.map((item: any) => item.str).join(' ');
            });
        }
      };

      const pdfData = await pdfParse(buffer, options);
      
      if (!pdfData || !pdfData.text) {
        throw new Error('Failed to extract text from PDF');
      }
      
      const extractedText = pdfData.text;

      // Generate roast using GPT with personality context
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: selectedPersonality.prompt
          },
          {
            role: 'user',
            content: `Here is the pitch deck content:\n\n${extractedText}\n\nPlease provide your feedback as a VC with the following characteristics:\n- Roast intensity: ${roastIntensity}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('No response generated from OpenAI');
      }

      const feedback = completion.choices[0].message.content;

      return NextResponse.json({
        success: true,
        feedback,
        roastIntensity,
        personality: selectedPersonality.name
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