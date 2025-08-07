import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}; 