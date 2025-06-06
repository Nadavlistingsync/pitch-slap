'use client';

import { FiCheck, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}: ToastProps) {
  const icons = {
    success: <FiCheck className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />,
    info: <FiInfo className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 flex items-center p-4 rounded-lg shadow-lg ${colors[type]} text-white`}
      onAnimationComplete={() => {
        setTimeout(onClose, duration);
      }}
    >
      <div className="flex items-center gap-3">
        {icons[type]}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
} 