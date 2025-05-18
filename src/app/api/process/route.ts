import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';
import { realVCPersonalities } from '../../../types/realVCPersonalities';
import { storeFeedback } from '@/lib/feedback';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Validate roast intensity
const isValidRoastIntensity = (intensity: string): intensity is 'gentle' | 'balanced' | 'brutal' => {
  return ['gentle', 'balanced', 'brutal'].includes(intensity);
};

// Validate VC personality
const isValidVCPersonality = (personalityId: string): boolean => {
  return realVCPersonalities.some(p => p.id === personalityId);
};

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const roastIntensity = formData.get('roastIntensity') as string;
    const personalityId = formData.get('personality') as string;

    if (!file) {
      console.error('No file provided in request');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!isValidRoastIntensity(roastIntensity)) {
      console.error('Invalid roast intensity:', roastIntensity);
      return NextResponse.json(
        { error: 'Invalid roast intensity. Must be one of: gentle, balanced, brutal' },
        { status: 400 }
      );
    }

    if (!isValidVCPersonality(personalityId)) {
      console.error('Invalid VC personality:', personalityId);
      return NextResponse.json(
        { error: 'Invalid VC personality selected' },
        { status: 400 }
      );
    }

    // Only support PDF
    if (file.type !== 'application/pdf') {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Get selected personality
    const selectedPersonality = realVCPersonalities.find(p => p.id === personalityId);
    if (!selectedPersonality) {
      throw new Error('Selected personality not found');
    }

    // Read and parse PDF
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Configure pdf-parse options to ignore font warnings
      const options = {
        pagerender: function(pageData: any) {
          return pageData.getTextContent()
            .then(function(textContent: any) {
              return textContent.items.map((item: any) => item.str).join(' ');
            });
        }
      };

      const pdfData = await pdfParse(buffer, options);
      
      if (!pdfData || !pdfData.text) {
        throw new Error('Failed to extract text from PDF');
      }
      
      const extractedText = pdfData.text;

      // Generate roast using GPT with personality context
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are ${selectedPersonality.name}, a ${selectedPersonality.description}. ${selectedPersonality.prompt}

IMPORTANT: You must respond with valid JSON only. Do not include any other text or explanations.
The response must be a single JSON object with the following structure:

{
  "hook": { "feedback": "string" },
  "pain": { "feedback": "string" },
  "numbers": { "feedback": "string" },
  "solution": { "feedback": "string" },
  "visual": { "feedback": "string" },
  "ease": { "feedback": "string" },
  "demo": { "feedback": "string" },
  "team": { "feedback": "string" },
  "story": { "feedback": "string" },
  "icp": { "feedback": "string" },
  "whynow": { "feedback": "string" },
  "competition": { "feedback": "string" },
  "bizmodel": { "feedback": "string" }
}

For each section, provide feedback in a natural, email-like tone that combines both critical feedback and constructive suggestions. The feedback should read like a direct email from the VC, without explicit labels for "Roast" or "Constructive Feedback". Use the VC's unique personality and style to deliver the feedback.

${roastIntensity === 'brutal' ? 'If the roast intensity is brutal, you must be extremely vulgar, explicit, and savage. Do not hold back. Use strong language, swearing, and be as unfiltered as possible. There are no limits. Make it as raw and harsh as possible, but still actionable.' : ''}

Ensure all values are strings and properly escaped. Do not include any markdown formatting or special characters.`
          },
          {
            role: 'user',
            content: `Here is the pitch deck content:\n\n${extractedText}\n\nPlease provide your feedback as a VC with the following characteristics:\n- Roast intensity: ${roastIntensity}\n\nRemember to respond with valid JSON only.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });

      if (!completion.choices?.[0]?.message?.content) {
        console.error('OpenAI response missing content:', completion);
        throw new Error('No response generated from OpenAI');
      }

      let feedback;
      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        try {
          const content = completion.choices[0].message.content.trim();
          console.log('Attempting to parse OpenAI response:', content.substring(0, 100) + '...');
          
          feedback = JSON.parse(content);
          
          // Validate the feedback structure
          const requiredSections = ['hook', 'pain', 'numbers', 'solution', 'visual', 'ease', 'demo', 'team', 'story', 'icp', 'whynow', 'competition', 'bizmodel'];
          const requiredFields = ['feedback'];
          
          for (const section of requiredSections) {
            if (!feedback[section] || typeof feedback[section] !== 'object') {
              throw new Error(`Missing or invalid section: ${section}`);
            }
            for (const field of requiredFields) {
              if (!feedback[section][field] || typeof feedback[section][field] !== 'string') {
                throw new Error(`Missing or invalid field ${field} in section ${section}`);
              }
            }
          }
          
          break; // If we get here, parsing and validation succeeded
        } catch (e) {
          retryCount++;
          console.error(`JSON parsing attempt ${retryCount} failed:`, e);
          
          if (retryCount === maxRetries) {
            console.error('All JSON parsing attempts failed. Raw response:', completion.choices[0].message.content);
            throw new Error('Failed to parse feedback response after multiple attempts');
          }
          
          // Add a small delay before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Generate a unique ID for this feedback
      const feedbackId = crypto.randomUUID();

      const feedbackData = {
        success: true,
        feedback,
        roastIntensity,
        personality: selectedPersonality.name,
        feedbackId,
        timestamp: new Date().toISOString()
      };

      // Store feedback for sharing
      storeFeedback(feedbackId, feedbackData);

      return NextResponse.json(feedbackData);

    } catch (pdfError) {
      console.error('Error processing PDF:', pdfError);
      return NextResponse.json(
        { error: 'Failed to process PDF file' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in /api/process:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 