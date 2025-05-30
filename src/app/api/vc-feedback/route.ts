import { NextResponse } from 'next/server';
import { VCPrompt, FeedbackRule } from '@/types/vc';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { vc, userInput } = await request.json();

    const prompt = `
You are an expert VC pitch coach. Analyze the following pitch based on these rules:

${vc.feedback_rules.map((rule: FeedbackRule) => `- ${rule.rule}`).join('\n')}

Pitch to analyze:
${userInput}

Provide:
1. A score out of 10
2. Specific feedback points based on the rules above
3. Suggestions for improvement

Format your response as JSON:
{
  "score": number,
  "feedback": string[],
  "suggestions": string[]
}
`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a VC pitch coach. Respond in JSON format only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json({
      score: response.score,
      feedback: response.feedback,
      suggestions: response.suggestions
    });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json(
      { error: 'Failed to process feedback' },
      { status: 500 }
    );
  }
} 