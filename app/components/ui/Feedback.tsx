import React from 'react';

export const LoadingOverlay = ({ text = 'Memuat...' }: { text?: string }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center z-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    <p className="mt-4 text-white text-lg">{text}</p>
  </div>
);

export const FeedbackMessage = ({ message, type }: { message: string; type: string }) => {
  if (!message) return null;
  const colors: { [key: string]: string } = {
    error: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-500',
  };
  return (
    <div
      className={`p-3 rounded-lg text-white mb-4 ${colors[type] || 'bg-gray-500'} transition-opacity duration-300`}
    >
      {message}
    </div>
  );
};
