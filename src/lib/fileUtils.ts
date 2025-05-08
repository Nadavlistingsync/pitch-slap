import { mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = '/tmp/uploads';
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'];

export const ensureUploadDirectory = async () => {
  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
    throw new Error('Failed to create upload directory');
  }
};

export const validateFileType = (type: string): boolean => {
  return ALLOWED_TYPES.includes(type);
};

export const generateUniqueFileName = (originalName: string): string => {
  const ext = originalName.split('.').pop();
  return `${uuidv4()}.${ext}`;
};

export const cleanupFile = async (filePath: string) => {
  try {
    await unlink(filePath);
  } catch (error) {
    console.error('Error cleaning up file:', error);
  }
}; 