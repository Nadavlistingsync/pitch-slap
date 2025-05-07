'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean lines and bold typography for a contemporary look',
    preview: '/templates/modern.png',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    preview: '/templates/minimal.png',
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional and polished for business presentations',
    preview: '/templates/corporate.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Dynamic and engaging with unique layouts',
    preview: '/templates/creative.png',
  },
];

export default function StylePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleContinue = () => {
    // In a real app, we would save the template selection
    router.push('/processing');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Style
          </h1>
          <p className="text-lg text-gray-600">
            Select a template that best matches your presentation's tone and purpose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`cursor-pointer rounded-lg border-2 p-6 transition-colors duration-200 ${
                selectedTemplate === template.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Template Preview</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600">{template.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Continue to Processing
          </motion.button>
        </div>
      </div>
    </main>
  );
} 