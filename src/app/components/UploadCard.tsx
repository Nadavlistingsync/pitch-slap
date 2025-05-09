import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const UploadCard: FC = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-2xl mx-auto p-8 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer
        ${isDragActive 
          ? 'border-[#ff4154] bg-[#ff4154]/5 shadow-[0_4px_20px_rgba(255,65,84,0.2)]' 
          : 'border-gray-300 hover:border-[#ff4154] hover:bg-[#ff4154]/5 hover:shadow-[0_4px_20px_rgba(255,65,84,0.1)]'
        }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="mb-4">
          <svg 
            className="w-12 h-12 mx-auto text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          {isDragActive ? 'Drop your pitch deck here' : 'Drag & drop your pitch deck'}
        </p>
        <p className="text-sm text-gray-500">
          PDF, PPT, or PPTX up to 10MB
        </p>
      </div>
    </div>
  );
};

export default UploadCard; 