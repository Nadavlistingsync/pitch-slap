import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Helper function to safely stringify objects
function safeStringify(obj: any): string {
  try {
    // First try to stringify the object
    const str = JSON.stringify(obj);
    // If it's already a string, return it
    if (typeof obj === 'string') return obj;
    // If it's an object that stringifies to [object Object], handle it specially
    if (str === '[object Object]') {
      return JSON.stringify({
        ...obj,
        toString: undefined // Remove toString to prevent recursion
      });
    }
    return str;
  } catch (e) {
    console.error('Error stringifying object:', e);
    return JSON.stringify({ error: 'Failed to stringify object' });
  }
}

export async function POST(req: NextRequest) {
  console.log('🔵 API: Starting roast request processing');
  
  try {
    const body = await req.json();
    console.log('🔵 API: Request body received:', {
      hasPitchDeck: !!body.pitchDeck,
      pitchDeckLength: body.pitchDeck?.length,
      vc: body.vc
    });

    if (!body.pitchDeck) {
      console.error('❌ API: Missing pitch deck in request');
      return new Response(
        safeStringify({ error: 'Pitch deck is required' }),
        { status: 400 }
      );
    }

    if (!body.vc) {
      console.error('❌ API: Missing VC in request');
      return new Response(
        safeStringify({ error: 'VC is required' }),
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('❌ API: OpenAI API key not configured');
      return new Response(
        safeStringify({ error: 'OpenAI API key not configured' }),
        { status: 500 }
      );
    }

    console.log('🔵 API: Creating VC-specific prompt');
    const prompt = `You are ${body.vc.name}, ${body.vc.knownFor}. ${body.vc.vibe}. Review this pitch deck and provide feedback: ${body.pitchDeck}`;
    console.log('🔵 API: Prompt created:', { promptLength: prompt.length });

    console.log('🔵 API: Calling OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    console.log('🔵 API: OpenAI response status:', response.status);
    const data = await response.json();
    console.log('🔵 API: OpenAI response data:', {
      hasChoices: !!data.choices,
      firstChoiceLength: data.choices?.[0]?.message?.content?.length,
      error: data.error
    });

    if (!response.ok) {
      console.error('❌ API: OpenAI API error:', data);
      return new Response(
        safeStringify({ error: 'Failed to get AI feedback' }),
        { status: 500 }
      );
    }

    const roast = data.choices[0].message.content.trim();
    console.log('🔵 API: Roast generated:', { roastLength: roast.length });

    const result = {
      roast,
      vc: {
        id: body.vc.id,
        name: body.vc.name,
        knownFor: body.vc.knownFor,
        vibe: body.vc.vibe
      }
    };

    console.log('🔵 API: Final result object:', {
      roastLength: result.roast.length,
      vc: result.vc
    });

    const serializedResult = safeStringify(result);
    console.log('🔵 API: Serialized result:', {
      length: serializedResult.length,
      preview: serializedResult.substring(0, 100) + '...'
    });

    return new Response(serializedResult, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate'
      }
    });

  } catch (error) {
    console.error('❌ API: Error processing request:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    const errorResponse = {
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    };

    console.log('🔵 API: Sending error response:', errorResponse);
    return new Response(
      safeStringify(errorResponse),
      { status: 500 }
    );
  }
} 