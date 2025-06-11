import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Parse request body with error handling
    let pitchDeck, vc, intensity;
    try {
      const body = await req.json();
      pitchDeck = body.pitchDeck;
      vc = body.vc;
      intensity = body.intensity;
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json({ 
        error: 'Invalid request format',
        details: 'Request body must be valid JSON'
      }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return NextResponse.json({ error: 'OpenAI API key not set' }, { status: 500 });
    }

    if (!pitchDeck || !vc || !intensity) {
      console.error('Missing required parameters:', { pitchDeck: !!pitchDeck, vc: !!vc, intensity });
      return NextResponse.json({ 
        error: 'Missing required parameters',
        details: {
          pitchDeck: !pitchDeck ? 'Pitch deck text is required' : null,
          vc: !vc ? 'VC information is required' : null,
          intensity: !intensity ? 'Intensity level is required' : null
        }
      }, { status: 400 });
    }

    // Build the prompt based on VC persona and intensity
    const prompt = `You are ${vc.name}, a VC known for: ${vc.knownFor}. Your style: ${vc.vibe}. Roast this pitch deck with ${intensity} intensity.\n\nPitch Deck:\n${pitchDeck}`;

    console.log('Making request to OpenAI API...');
    let response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
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
    } catch (fetchError) {
      console.error('Failed to make request to OpenAI API:', fetchError);
      return NextResponse.json({ 
        error: 'Failed to connect to OpenAI API',
        details: fetchError instanceof Error ? fetchError.message : 'Network error'
      }, { status: 500 });
    }

    console.log('OpenAI API response status:', response.status);
    
    let responseData;
    try {
      responseData = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse OpenAI API response:', jsonError);
      return NextResponse.json({ 
        error: 'Invalid response from OpenAI API',
        details: 'Could not parse API response'
      }, { status: 500 });
    }
    
    if (!response.ok) {
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        headers: Object.fromEntries(response.headers.entries())
      });
      return NextResponse.json({ 
        error: `OpenAI API error: ${responseData.error?.message || 'Unknown error'}`,
        details: responseData
      }, { status: response.status });
    }
    
    if (!responseData.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', responseData);
      return NextResponse.json({ 
        error: 'Unexpected response format from OpenAI',
        details: 'Response missing required fields'
      }, { status: 500 });
    }

    const roast = responseData.choices[0].message.content;
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
      error: 'Failed to get feedback from OpenAI',
      details: errorMessage
    }, { status: 500 });
  }
} 