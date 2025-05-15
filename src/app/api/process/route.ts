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

export async function POST(req: NextRequest) {
  try {
    const { deckContent, vcStyle, roastIntensity } = await req.json();

    const prompt = `As a ${vcStyle} VC, analyze this pitch deck with ${roastIntensity} intensity. Focus on:
    1. Market opportunity and size
    2. Business model and revenue potential
    3. Team and execution capability
    4. Competition and differentiation
    5. Financial projections and funding ask
    Provide brutally honest feedback that will help the founders improve their pitch.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a seasoned VC with a reputation for brutal honesty and valuable feedback." },
        { role: "user", content: prompt + "\n\nPitch Deck Content:\n" + deckContent }
      ],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json({ 
      feedback: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing pitch deck:', error);
    return NextResponse.json(
      { error: 'Failed to process pitch deck' },
      { status: 500 }
    );
  }
} 