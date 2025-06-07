import { FC } from 'react';

const UploadCard: FC = () => (
  <div className="p-8 text-center text-gray-500 border-2 border-dashed rounded-2xl">
    Please use the main &quot;Upload Your Deck&quot; button above to start the feedback process.
    <p className="text-gray-600 mb-4">
      Upload your pitch deck in PDF format. We&apos;ll analyze it and provide detailed feedback.
    </p>
    <p className="text-gray-500">Drag &amp; drop your pitch deck PDF here, or click to select a file. (Max size: 10MB)</p>
  </div>
);

export default UploadCard; 