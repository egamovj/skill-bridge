import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  interactive = false,
  onClick,
  ...props 
}) => {
  // Variant styles
  const variants = {
    default: 'bg-white dark:bg-gray-800 shadow-sm',
    elevated: 'bg-white dark:bg-gray-800 shadow-md',
    bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    ghost: 'bg-gray-50 dark:bg-gray-850',
  };

  const baseStyles = `
    rounded-lg overflow-hidden
    ${variants[variant]}
    ${interactive ? 'cursor-pointer transition-all duration-200 hover:shadow-md' : ''}
    ${className}
  `;

  const motionProps = interactive ? {
    whileHover: { y: -4, boxShadow: '0 12px 24px -10px rgba(0, 0, 0, 0.1)' },
    transition: { duration: 0.2 }
  } : {};

  return (
    <motion.div 
      className={baseStyles} 
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;