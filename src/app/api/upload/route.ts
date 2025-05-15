import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ensureUploadDirectory, validateFileType, generateUniqueFileName, cleanupFile } from '@/lib/fileUtils';
import { v4 as uuidv4 } from 'uuid';

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = uuidv4();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uniqueId}.${fileExtension}`;
    
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