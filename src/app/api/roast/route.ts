export const runtime = 'edge';

export async function POST(request: Request) {
  const requestId = Math.random().toString(36).substring(7);
  const startTime = Date.now();

  const log = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      requestId,
      message,
      ...(data && { data })
    };
    console.log(JSON.stringify(logData));
  };

  try {
    log('Starting roast request processing');
    let body;
    try {
      const text = await request.text();
      log('Received request body', { length: text.length });
      body = JSON.parse(text);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      log('Failed to parse request body', { error: errorMessage });
      return new Response(
        JSON.stringify({ error: 'Failed to parse request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { pitchDeck, vc, intensity = 'balanced' } = body;

    if (!pitchDeck || typeof pitchDeck !== 'string') {
      log('Invalid pitch deck format');
      return new Response(
        JSON.stringify({ error: 'Invalid pitch deck format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!vc || typeof vc !== 'object') {
      log('Invalid VC format');
      return new Response(
        JSON.stringify({ error: 'Invalid VC format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    log('Processing pitch deck', { 
      contentLength: pitchDeck.length,
      preview: pitchDeck.substring(0, 200),
      intensity
    });

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      log('OpenAI API key not configured');
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

    log('Preparing OpenAI request', { vc: cleanVc });

    // Define intensity levels
    const intensityLevels = {
      gentle: 'Provide constructive feedback in a supportive and encouraging manner. Focus on strengths and opportunities for growth.',
      balanced: 'Provide balanced feedback that highlights both strengths and areas for improvement. Be direct but constructive.',
      brutal: 'Provide brutally honest feedback that pulls no punches. Be direct, critical, and challenge assumptions.'
    } as const;

    type IntensityType = keyof typeof intensityLevels;
    const selectedIntensity = (intensity as IntensityType) || 'balanced';
    const intensityLevel = intensityLevels[selectedIntensity];

    const prompt = `You are ${cleanVc.name} from ${cleanVc.firm}, known for ${cleanVc.knownFor}. 
Your investment style is ${cleanVc.vibe}.

${intensityLevel}

Please review this pitch deck and provide detailed feedback in the following format:

EXECUTIVE SUMMARY:
[Provide a brief overview of the pitch deck and your initial impressions. What's the core value proposition? Is it clear and compelling?]

MARKET OPPORTUNITY:
[Analyze the market size, timing, and competitive landscape. Is the opportunity big enough? Is the timing right?]

PRODUCT & TECHNOLOGY:
[Evaluate the product/technology. Is it innovative? Does it solve a real problem? What's the technical moat?]

TEAM & EXECUTION:
[Assess the team's capabilities and execution plan. Do they have the right experience? Is the go-to-market strategy solid?]

FINANCIALS & METRICS:
[Review the financial projections and key metrics. Are they realistic? What metrics matter most for this business?]

KEY STRENGTHS:
[What aspects of the pitch deck are particularly compelling? What makes this opportunity unique?]

AREAS FOR IMPROVEMENT:
[What aspects need work? Be specific and constructive. What's missing or unclear?]

SPECIFIC RECOMMENDATIONS:
[Provide actionable suggestions for improvement. What specific changes would make this more compelling?]

OVERALL ASSESSMENT:
[Final thoughts and whether you would invest. What would it take to get you to invest?]

Pitch Deck Content:
${pitchDeck}`;

    log('Sending request to OpenAI');
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a venture capitalist providing detailed feedback on pitch decks. ${intensityLevel}

Key points to consider:
1. Market size and timing
2. Product/technology differentiation
3. Team capabilities and execution
4. Financial projections and metrics
5. Go-to-market strategy
6. Competitive advantage
7. Risk factors and mitigation

Provide specific, actionable feedback that helps founders improve their pitch.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: intensity === 'brutal' ? 0.9 : intensity === 'gentle' ? 0.5 : 0.7,
        max_tokens: 2000,
        presence_penalty: 0.6,
        frequency_penalty: 0.3
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      log('OpenAI API error', { 
        status: openaiResponse.status,
        error: errorData
      });
      return new Response(
        JSON.stringify({ error: errorData.error || JSON.stringify(errorData) }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const openaiData = await openaiResponse.json();
    log('Received OpenAI response');

    if (!openaiData.choices?.[0]?.message?.content) {
      log('Invalid OpenAI response format', { response: openaiData });
      return new Response(
        JSON.stringify({ error: 'Invalid response format from AI service' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const roast = openaiData.choices[0].message.content.trim();
    const processingTime = Date.now() - startTime;
    
    log('Generated roast', { 
      length: roast.length,
      processingTimeMs: processingTime
    });

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
    const processingTime = Date.now() - startTime;
    log('Unexpected error', { 
      error: error instanceof Error ? error.message : 'Unknown error',
      processingTimeMs: processingTime
    });
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 