import React, { useCallback, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiCheck, FiAlertCircle } from 'react-icons/fi';
import Image from 'next/image';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
  maxSize?: number; // in bytes
  maxFiles?: number;
  className?: string;
  label?: string;
  error?: string;
}

interface UploadedFile {
  file: File;
  preview: string;
  progress: number;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = ['image/*', 'application/pdf'],
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 1,
  className = '',
  label = 'Drag & drop files here, or click to select',
  error: externalError,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadTimeoutRef = useRef<NodeJS.Timeout>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      try {
        const newFiles = acceptedFiles.map((file) => ({
          file,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
          progress: 0,
        }));

        setFiles((prev) => [...prev, ...newFiles].slice(0, maxFiles));
        
        // Simulate upload progress
        setIsUploading(true);
        let progress = 0;
        uploadTimeoutRef.current = setInterval(() => {
          progress += 10;
          setFiles((prev) =>
            prev.map((f) => ({
              ...f,
              progress: Math.min(progress, 100),
            }))
          );

          if (progress >= 100) {
            clearInterval(uploadTimeoutRef.current);
            setIsUploading(false);
            onFileSelect(acceptedFiles[0]);
          }
        }, 200);
      } catch (error) {
        console.error('File upload error:', error);
        setFiles((prev) => 
          prev.map(f => ({
            ...f,
            error: error instanceof Error ? error.message : 'Failed to process file'
          }))
        );
      }
    },
    [maxFiles, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    maxFiles,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      const removedFile = newFiles[index];
      if (removedFile.preview) {
        URL.revokeObjectURL(removedFile.preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  // Cleanup preview URLs on unmount
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
      if (uploadTimeoutRef.current) {
        clearInterval(uploadTimeoutRef.current);
      }
    };
  }, [files]);

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${externalError ? 'border-red-500' : ''}`}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">{label}</p>
        <p className="mt-1 text-xs text-gray-500">
          {acceptedFileTypes.join(', ')} up to {maxSize / 1024 / 1024}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {file.preview ? (
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    width={128}
                    height={128}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <FiUpload className="text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {isUploading && (
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                    />
                  </div>
                )}
                {file.error ? (
                  <FiAlertCircle className="text-red-500" />
                ) : file.progress === 100 ? (
                  <FiCheck className="text-green-500" />
                ) : null}
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <FiX className="text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {externalError && (
        <p
          className="mt-2 text-sm text-red-500"
        >
          {externalError}
        </p>
      )}
    </div>
  );
};

export default FileUpload; 