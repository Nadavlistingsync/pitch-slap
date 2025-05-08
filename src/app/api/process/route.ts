import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import OpenAI from 'openai';
import { vcPrompts, VCPrompt } from '@/lib/vcPrompts';

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

    const { fileName, vcId, vcName } = await request.json();

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

    // Find the VC prompt based on the vcId
    const prompts = Array.from(vcPrompts);
    const vcPrompt = prompts.find(vc => vc.name === vcName);
    
    let prompt = '';
    let model = 'gpt-4'; // Default model

    if (vcPrompt) {
      prompt = `${vcPrompt.prompt}\n\nReview the following pitch deck and provide critical feedback. Focus on identifying weaknesses, gaps, and areas for improvement. Be specific and constructive in your criticism.\n\nPitch deck content:\n${extractedText}`;
      model = vcPrompt.model;
    } else {
      prompt = `You are ${vcName || 'a top venture capitalist'}.
Review the following pitch deck and provide critical feedback. Focus on identifying weaknesses, gaps, and areas for improvement. Be specific and constructive in your criticism.\n\nPitch deck content:\n${extractedText}`;
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
      vcName,
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