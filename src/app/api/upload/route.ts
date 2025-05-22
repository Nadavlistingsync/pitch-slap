import { NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Only support PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported' },
        { status: 400 }
      );
    }

    // Read and parse PDF directly from memory
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

    // Return the extracted text
    return NextResponse.json({
      success: true,
      text: pdfData.text
    });

  } catch (error) {
    console.error('Error processing PDF:', error);
    return NextResponse.json(
      { error: 'Failed to process PDF file' },
      { status: 500 }
    );
  }
} 