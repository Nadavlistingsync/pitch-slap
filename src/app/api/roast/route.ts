import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { pitchDeck, vc, intensity } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
    }

    if (!pitchDeck || !vc || !intensity) {
      console.error('Missing required parameters:', { pitchDeck: !!pitchDeck, vc: !!vc, intensity });
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Build the prompt based on VC persona and intensity
    const prompt = `You are ${vc.name}, a VC known for: ${vc.knownFor}. Your style: ${vc.vibe}. Roast this pitch deck with ${intensity} intensity.\n\nPitch Deck:\n${pitchDeck}`;

    console.log('Making request to OpenAI API...');
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

    console.log('OpenAI API response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        headers: Object.fromEntries(response.headers.entries())
      });
      return NextResponse.json({ 
        error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}`,
        details: errorData
      }, { status: response.status });
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', data);
      return NextResponse.json({ error: 'Unexpected response format from OpenAI' }, { status: 500 });
    }

    const roast = data.choices[0].message.content;
    console.log('Successfully generated roast');
    return NextResponse.json({ roast });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorName = error instanceof Error ? error.name : 'Error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error in roast API route:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack
    });
    
    return NextResponse.json({ 
      error: 'Failed to get feedback from OpenAI.',
      details: errorMessage
    }, { status: 500 });
  }
} 