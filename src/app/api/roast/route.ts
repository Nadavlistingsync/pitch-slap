import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Helper function to create a clean VC object
function createCleanVcObject(vc: any) {
  return {
    id: String(vc?.id || ''),
    name: String(vc?.name || ''),
    knownFor: String(vc?.knownFor || ''),
    vibe: String(vc?.vibe || '')
  };
}

// Helper function to safely stringify objects
function safeStringify(obj: any): string {
  try {
    // If it's already a string, return it
    if (typeof obj === 'string') {
      return obj;
    }

    // If it's null or undefined, return empty object
    if (obj == null) {
      return '{}';
    }

    // If it's a VC object, use the clean VC object creator
    if (obj.id !== undefined || obj.name !== undefined) {
      const cleanVc = createCleanVcObject(obj);
      return JSON.stringify(cleanVc);
    }

    // For other objects, create a clean copy
    const cleanObj = Object.entries(obj).reduce((acc, [key, value]) => {
      // Skip functions and undefined values
      if (typeof value !== 'function' && value !== undefined) {
        // Convert values to strings if they're not objects
        acc[key] = typeof value === 'object' ? value : String(value);
      }
      return acc;
    }, {} as Record<string, any>);

    return JSON.stringify(cleanObj);
  } catch (e) {
    console.error('❌ Serialization: Error during stringification:', e);
    return '{}';
  }
}

export async function POST(request: Request) {
  try {
    console.log('🔵 API: Starting roast request processing');
    let body;
    try {
      const text = await request.text();
      console.log('🔵 API: Raw request body length:', text.length);
      body = JSON.parse(text);
    } catch (parseError) {
      console.error('❌ API: Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { pitchDeck, vc } = body;

    if (!pitchDeck || typeof pitchDeck !== 'string') {
      console.error('❌ API: Invalid pitch deck format:', typeof pitchDeck);
      return new Response(
        JSON.stringify({ error: 'Invalid pitch deck format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!vc || typeof vc !== 'object') {
      console.error('❌ API: Invalid VC format:', typeof vc);
      return new Response(
        JSON.stringify({ error: 'Invalid VC format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('🔵 API: Pitch deck content length:', pitchDeck.length);
    console.log('🔵 API: Pitch deck preview:', pitchDeck.substring(0, 200) + '...');

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.error('❌ API: OpenAI API key not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a clean VC object
    const cleanVc = {
      name: vc.name,
      firm: vc.firm,
      knownFor: vc.knownFor,
      vibe: vc.vibe
    };

    console.log('🔵 API: Preparing OpenAI request with VC:', cleanVc);

    const prompt = `You are ${cleanVc.name} from ${cleanVc.firm}, known for ${cleanVc.knownFor}. 
Your investment style is ${cleanVc.vibe}.

Please review this pitch deck and provide detailed, constructive feedback in the following format:

EXECUTIVE SUMMARY:
[Provide a brief overview of the pitch deck and your initial impressions]

KEY STRENGTHS:
[What aspects of the pitch deck are particularly compelling?]

AREAS FOR IMPROVEMENT:
[What aspects need work? Be specific and constructive]

SPECIFIC RECOMMENDATIONS:
[Provide actionable suggestions for improvement]

OVERALL ASSESSMENT:
[Final thoughts and whether you would invest]

Pitch Deck Content:
${pitchDeck}`;

    console.log('🔵 API: Sending request to OpenAI');
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a venture capitalist providing detailed, constructive feedback on pitch decks. Be specific, actionable, and maintain a professional tone.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      })
    });

    console.log('🔵 API: OpenAI response status:', openaiResponse.status);
    const openaiData = await openaiResponse.json();
    console.log('🔵 API: OpenAI response:', JSON.stringify(openaiData, null, 2));

    if (!openaiResponse.ok) {
      console.error('❌ API: OpenAI API error:', openaiData);
      return new Response(
        JSON.stringify({ error: 'Failed to process pitch deck' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!openaiData.choices?.[0]?.message?.content) {
      console.error('❌ API: Invalid OpenAI response format:', openaiData);
      return new Response(
        JSON.stringify({ error: 'Invalid response format from AI service' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const roast = openaiData.choices[0].message.content.trim();
    console.log('🔵 API: Generated roast length:', roast.length);
    console.log('🔵 API: Roast preview:', roast.substring(0, 200) + '...');

    return new Response(
      JSON.stringify({ roast, vc: cleanVc }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  } catch (error) {
    console.error('❌ API: Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 