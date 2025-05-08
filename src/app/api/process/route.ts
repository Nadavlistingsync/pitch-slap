import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import OpenAI from 'openai';
import { vcPrompts } from '@/lib/vcPrompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Skip PDF processing during build time
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV;

export async function POST(request: NextRequest) {
  try {
    // Skip processing during build time
    if (isBuildTime) {
      return NextResponse.json({ 
        success: true, 
        commentary: "API is ready for processing",
        feedbackStyle: "default"
      });
    }

    const { fileName, vcStyle } = await request.json();

    if (!fileName) {
      return NextResponse.json(
        { error: 'No file name provided.' },
        { status: 400 }
      );
    }

    const filePath = '/tmp/uploads/' + fileName;
    const dataBuffer = await readFile(filePath);
    
    // Dynamically import pdf-parse only when needed
    const pdfParse = (await import('pdf-parse')).default;
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    // Generate VC-style commentary
    // vcStyle format: 'Name | Firm | Description'
    let prompt = '';
    let model = 'gpt-4o-mini'; // Default model
    if (vcStyle) {
      const [vcName, vcFirm] = vcStyle.split(' | ');
      const vcPrompt = vcPrompts.find(
        (vc) => vc.name === vcName && vc.firm === vcFirm
      );
      if (vcPrompt) {
        prompt = `${vcPrompt.prompt}\n\nReview the following pitch deck and provide critical feedback. Focus on identifying weaknesses, gaps, and areas for improvement. Be specific and constructive in your criticism.\n\nPitch deck content:\n${extractedText}`;
        model = vcPrompt.model;
      } else {
        prompt = `You are ${vcName ? vcName : 'a top venture capitalist'}${vcFirm ? ` from ${vcFirm}` : ''}.
Review the following pitch deck and provide critical feedback. Focus on identifying weaknesses, gaps, and areas for improvement. Be specific and constructive in your criticism.\n\nPitch deck content:\n${extractedText}`;
      }
    } else {
      prompt = `You are a top venture capitalist. Review the following pitch deck and provide critical feedback. Focus on identifying weaknesses, gaps, and areas for improvement. Be specific and constructive in your criticism.\n\nPitch deck content:\n${extractedText}`;
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const commentary = completion.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      commentary,
      vcStyle,
      model 
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    // DEBUG: Return the actual error message for troubleshooting (REMOVE IN PRODUCTION)
    return NextResponse.json(
      { error: 'Failed to process PDF.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 