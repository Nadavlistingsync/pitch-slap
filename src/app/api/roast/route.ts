import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { pitchDeck, vc, intensity } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
  }

  // Build the prompt based on VC persona and intensity
  const prompt = `You are ${vc.name}, a VC known for: ${vc.knownFor}. Your style: ${vc.vibe}. Roast this pitch deck with ${intensity} intensity.\n\nPitch Deck:\n${pitchDeck}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a brutally honest VC giving feedback.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 600,
        temperature: 0.8,
      }),
    });
    const data = await response.json();
    const roast = data.choices?.[0]?.message?.content || 'No feedback generated.';
    return NextResponse.json({ roast });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get feedback from OpenAI.' }, { status: 500 });
  }
} 