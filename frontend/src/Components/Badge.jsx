import React from 'react';

const Badge = ({ children, variant = "primary", className = "" }) => {
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-500 text-white",
    outline: "border border-gray-200 bg-white text-gray-800"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;