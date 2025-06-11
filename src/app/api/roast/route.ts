import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { pitchDeck, vc } = body;

    if (!pitchDeck || !vc) {
      return new Response(
        JSON.stringify({ error: 'Missing pitch deck or VC information' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    // Create VC-specific prompt
    const prompt = `You are ${vc.name}, a VC known for: ${vc.knownFor}. Your style: ${vc.vibe}. 
    Review this pitch deck and provide your honest feedback:\n\n${pitchDeck}`;

    // Call OpenAI API
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to get AI response' }));
      return new Response(
        JSON.stringify({ error: errorData.error || 'Failed to get AI response' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI' }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    // Return just the AI's response
    const result = {
      roast: data.choices[0].message.content.trim(),
      vc: {
        id: vc.id,
        name: vc.name,
        knownFor: vc.knownFor,
        vibe: vc.vibe
      }
    };

    return new Response(
      JSON.stringify(result),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );

  } catch (error) {
    console.error('Error in roast API:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 