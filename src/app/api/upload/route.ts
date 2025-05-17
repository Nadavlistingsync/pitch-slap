import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ensureUploadDirectory, validateFileType, generateUniqueFileName, cleanupFile } from '@/lib/fileUtils';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    if (!validateFileType(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure upload directory exists
    await ensureUploadDirectory();

    // Create unique filename
    const fileName = generateUniqueFileName(file.name);
    
    // Save file
    const uploadDir = join(process.cwd(), 'uploads');
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      success: true,
      fileName,
      fileType: file.type,
      fileSize: file.size
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
} 