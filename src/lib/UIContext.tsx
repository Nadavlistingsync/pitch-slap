'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import FeedbackToast from '../components/FeedbackToast';

interface UIContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setToast({ message, type });
  }, []);

  const handleToastClose = useCallback(() => {
    setToast(null);
  }, []);

  return (
    <UIContext.Provider
      value={{
        showToast,
        isLoading,
        setLoading: setIsLoading,
      }}
    >
      {children}
      {toast && (
        <FeedbackToast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}; 