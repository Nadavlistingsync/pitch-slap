import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    // Parse request body with error handling
    let pitchDeck, vc, intensity;
    try {
      const body = await req.json();
      console.log('Received request body:', { 
        hasPitchDeck: !!body.pitchDeck,
        hasVc: !!body.vc,
        intensity: body.intensity
      });
      pitchDeck = body.pitchDeck;
      vc = body.vc;
      intensity = body.intensity;
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request format',
          details: 'Request body must be valid JSON'
        }), 
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not set' 
        }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    if (!pitchDeck || !vc || !intensity) {
      console.error('Missing required parameters:', { pitchDeck: !!pitchDeck, vc: !!vc, intensity });
      return new Response(
        JSON.stringify({ 
          error: 'Missing required parameters',
          details: {
            pitchDeck: !pitchDeck ? 'Pitch deck text is required' : null,
            vc: !vc ? 'VC information is required' : null,
            intensity: !intensity ? 'Intensity level is required' : null
          }
        }), 
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
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
      return new Response(
        JSON.stringify({ 
          error: 'Failed to connect to OpenAI API',
          details: fetchError instanceof Error ? fetchError.message : 'Network error'
        }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    console.log('OpenAI API response status:', response.status);
    
    let responseData;
    try {
      responseData = await response.json();
      console.log('API response data:', responseData);
    } catch (jsonError) {
      console.error('Failed to parse OpenAI API response:', jsonError);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid response from OpenAI API',
          details: 'Could not parse API response'
        }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }
    
    if (!response.ok) {
      console.error('OpenAI API error:', {
        status: response.status,
        statusText: response.statusText,
        error: responseData,
        headers: Object.fromEntries(response.headers.entries())
      });
      return new Response(
        JSON.stringify({ 
          error: `OpenAI API error: ${responseData.error?.message || 'Unknown error'}`,
          details: JSON.stringify(responseData)
        }), 
        { 
          status: response.status,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }
    
    if (!responseData.choices?.[0]?.message?.content) {
      console.error('Unexpected API response format:', responseData);
      return new Response(
        JSON.stringify({ 
          error: 'Unexpected response format from OpenAI',
          details: JSON.stringify(responseData)
        }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store'
          }
        }
      );
    }

    const roast = responseData.choices[0].message.content;
    console.log('Successfully generated roast');
    
    // Create a clean result object with only the necessary data
    const result = {
      roast: roast.trim(),
      vc: {
        id: vc.id,
        name: vc.name,
        knownFor: vc.knownFor,
        vibe: vc.vibe
      },
      intensity,
      timestamp: new Date().toISOString()
    };
    
    // Log the result before serialization
    console.log('Result object:', result);
    
    // Ensure proper serialization with no circular references
    const serializedResult = JSON.stringify(result, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Handle any potential circular references
        try {
          JSON.stringify(value);
          return value;
        } catch (e) {
          return '[Circular]';
        }
      }
      return value;
    }, 2);
    
    console.log('Serialized response:', serializedResult);
    
    // Return the response with proper headers
    return new Response(
      serializedResult,
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store'
        }
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorName = error instanceof Error ? error.name : 'Error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error in roast API route:', {
      name: errorName,
      message: errorMessage,
      stack: errorStack
    });
    
    // Create a clean error response
    const errorResponse = {
      error: 'Failed to get feedback from OpenAI',
      details: errorMessage
    };
    
    // Log the error response
    console.log('Error response:', errorResponse);
    
    // Ensure proper serialization of error response
    const serializedError = JSON.stringify(errorResponse, null, 2);
    
    return new Response(
      serializedError,
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
} 