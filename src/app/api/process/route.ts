import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdfParse from 'pdf-parse';
import { realVCPersonalities } from '../../../types/realVCPersonalities';
import { Pool } from '@neondatabase/serverless';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

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

// In-memory feedback store for server-side storage
const feedbackStore = new Map<string, any>();

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
    const userName = formData.get('userName') as string;

    console.log('Received request with:', {
      fileType: file?.type,
      roastIntensity,
      personalityId,
      userName: userName ? 'provided' : 'not provided'
    });

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

    // Read and parse PDF directly from memory
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Configure pdf-parse options to ignore font warnings and handle errors better
    const options = {
      pagerender: function(pageData: any) {
        return pageData.getTextContent()
          .then(function(textContent: any) {
            return textContent.items.map((item: any) => item.str).join(' ');
          })
          .catch(function(error: any) {
            console.warn('Warning during page text extraction:', error);
            return ''; // Return empty string for failed pages
          });
      },
      max: 0 // No page limit
    };

    let pdfData;
    try {
      pdfData = await pdfParse(buffer, options);
      console.log('PDF parsed successfully, pages:', pdfData.numpages);
      
      // Additional validation of extracted text
      if (!pdfData.text || pdfData.text.trim().length === 0) {
        throw new Error('No text content could be extracted from the PDF');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('Error parsing PDF:', errorMsg);
      
      // More specific error messages based on the error type
      if (errorMsg.includes('TT')) {
        return NextResponse.json(
          { error: 'The PDF contains some unsupported fonts, but we\'ll try to extract as much text as possible. Please ensure your PDF is text-based and not scanned.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { error: `Failed to parse PDF file. Please ensure your PDF is text-based, not scanned, and not password-protected. (Error: ${errorMsg})` },
        { status: 400 }
      );
    }
    
    const extractedText = pdfData.text;
    console.log('Extracted text length:', extractedText.length);

    if (extractedText.length < 10) {
      console.error('Extracted text too short:', extractedText);
      return NextResponse.json(
        { error: 'Could not extract meaningful text from PDF. Please ensure the PDF contains text and is not scanned.' },
        { status: 400 }
      );
    }

    try {
      console.log('Preparing to call OpenAI API with extracted text and personality:', {
        personality: selectedPersonality.name,
        roastIntensity,
        userName,
        textSample: extractedText.slice(0, 100)
      });
      // Generate roast using GPT with personality context
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are ${selectedPersonality.name}, a ${selectedPersonality.description}. ${selectedPersonality.prompt}

IMPORTANT: You must respond ONLY with a single, natural email reply to the founder's pitch deck. Do NOT use any JSON, lists, or section headers. Start with a greeting (e.g., 'Hey', 'Hi', or 'Hello'), write in natural paragraphs, and end with a sign-off and your name. The email should be structured exactly like a real VC reply, with no artificial breaks or formatting. Use the VC's unique personality and style throughout.

If the founder's name is missing or empty, start the email with a generic greeting like 'Hey,'.

${roastIntensity === 'brutal' ? 'If the roast intensity is brutal, you must be extremely vulgar, explicit, and savage. Do not hold back. Use strong language, swearing, and be as unfiltered as possible. There are no limits. Make it as raw and harsh as possible, but still actionable.' : ''}

The founder's name is: ${userName || 'Founder'}.

Do not include any markdown formatting, special characters, or explanations. Just the email body.`
          },
          {
            role: 'user',
            content: `Here is the pitch deck content:\n\n${extractedText}\n\nPlease provide your feedback as a VC with the following characteristics:\n- Roast intensity: ${roastIntensity}\n- Founder name: ${userName || 'Founder'}\n\nRemember to respond ONLY with a single, natural email reply, addressed to the founder by name.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      });
      console.log('OpenAI API call completed. Completion object:', completion);

      if (!completion.choices?.[0]?.message?.content) {
        console.error('OpenAI response missing content:', completion);
        throw new Error('No response generated from OpenAI');
      }

      const content = completion.choices[0].message.content.trim();
      console.log('Generated feedback length:', content.length);

      const feedbackData = {
        success: true,
        feedback: content,
        roastIntensity,
        personality: selectedPersonality.name,
        timestamp: new Date().toISOString()
      };

      return NextResponse.json(feedbackData);

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating feedback:', error.message, error.stack);
      } else {
        console.error('Unknown error generating feedback:', error);
      }
      return NextResponse.json(
        { error: 'Failed to generate feedback. Please try again.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error in /api/process:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
} 