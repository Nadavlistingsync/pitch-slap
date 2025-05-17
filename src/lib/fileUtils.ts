import { mkdir, access } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/vnd.ms-powerpoint', // .ppt
  'image/jpeg',
  'image/png'
];

export async function ensureUploadDirectory(): Promise<void> {
  const uploadDir = join(process.cwd(), 'uploads');
  try {
    await access(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }
}

export function validateFileType(fileType: string): boolean {
  return ALLOWED_FILE_TYPES.includes(fileType);
}

export function generateUniqueFileName(originalName: string): string {
  const fileExtension = originalName.split('.').pop();
  const uniqueId = uuidv4();
  return `${uniqueId}.${fileExtension}`;
}

export async function cleanupFile(filePath: string): Promise<void> {
  try {
    const fs = await import('fs/promises');
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error cleaning up file:', error);
  }
} 