'use client';

import React from 'react';

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <svg 
            className="w-6 h-6 text-red-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-red-600 text-sm mb-4">
          {message}
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorDisplay;