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

    console.log('[API/process] Incoming request:', { vcId, fileType: file?.type, fileName: file?.name });

    if (!file) {
      console.log('[API/process] No file uploaded.');
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
        console.log('[API/process] PDF parsed successfully.');
      } catch (err) {
        console.error('[API/process] Failed to parse PDF:', err);
        return NextResponse.json({ error: 'Failed to parse PDF.' }, { status: 400 });
      }
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
      // Optionally: handle PPTX parsing here if needed
      extractedText = `PPTX file uploaded: ${file.name}`;
      console.log('[API/process] PPTX file received.');
    } else {
      console.log('[API/process] Unsupported file type:', file.type);
      return NextResponse.json({ error: 'Unsupported file type.' }, { status: 400 });
    }

    // Find the VC prompt by id
    const vcPrompt = vcPrompts.find(vc => vc.id === vcId);
    console.log('[API/process] VC prompt lookup:', { vcId, found: !!vcPrompt });

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
    console.log('[API/process] OpenAI response received.');

    return NextResponse.json({
      success: true,
      commentary,
      vcId,
      model,
    });
  } catch (error) {
    console.error('[API/process] Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file.' },
      { status: 500 }
    );
  }
} 