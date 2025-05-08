import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import OpenAI from 'openai';

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

    const { fileName, feedbackStyle } = await request.json();

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
    const prompt = `As a venture capitalist, review this pitch deck and provide feedback in a ${feedbackStyle} style. Focus on:
    1. Market opportunity and size
    2. Business model and revenue potential
    3. Team and execution capability
    4. Competitive advantage
    5. Financial projections and funding needs
    6. Overall pitch effectiveness

    Pitch deck content:
    ${extractedText}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const commentary = completion.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      commentary,
      feedbackStyle 
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