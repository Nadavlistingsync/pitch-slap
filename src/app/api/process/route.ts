import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { vcPrompts } from '@/lib/vcPrompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const vcId = formData.get('vcId') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // Read the file buffer directly
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';
    if (file.type === 'application/pdf') {
      try {
        const pdfParse = (await import('pdf-parse')).default;
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (err) {
        return NextResponse.json({ error: 'Failed to parse PDF.' }, { status: 400 });
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      // Optionally: handle PPTX parsing here if needed
      extractedText = `PPTX file uploaded: ${file.name}`;
    } else {
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
    }

    // Find the VC prompt by id
    const vcPrompt = vcPrompts.find(vc => vc.id === vcId);

    let prompt = '';
    let model = 'gpt-4';

    if (vcPrompt) {
      prompt = `${vcPrompt.prompt}\n\nPitch deck content:\n${extractedText}`;
      model = vcPrompt.model;
    } else {
      prompt = `You are a top venture capitalist.\nPitch deck content:\n${extractedText}`;
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const commentary = completion.choices[0]?.message?.content;

    return NextResponse.json({
      success: true,
      commentary,
      vcId,
      model,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file.' },
      { status: 500 }
    );
  }
} 