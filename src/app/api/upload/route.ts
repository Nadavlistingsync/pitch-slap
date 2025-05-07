import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ensureUploadDirectory, validateFileType, generateUniqueFileName, cleanupFile } from '@/lib/fileUtils';

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDirectory();

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded.' },
        { status: 400 }
      );
    }

    const fileType = file.type || '';
    if (!validateFileType(fileType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or PowerPoint file.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = generateUniqueFileName(file.name);
    const filePath = join(process.cwd(), 'uploads', fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ success: true, fileName });

  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Failed to process file upload.' },
      { status: 500 }
    );
  }
} 