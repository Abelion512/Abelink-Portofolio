import React from 'react';

const VerifiedBadge: React.FC = () => {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 ml-2 bg-blue-500 rounded-full shadow-sm" title="Verified Builder">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-3.5 h-3.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
};

export default VerifiedBadge;
