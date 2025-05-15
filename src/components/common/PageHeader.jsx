import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ 
  title, 
  subtitle, 
  action,
  background = 'gradient',
}) => {
  const backgrounds = {
    gradient: 'bg-gradient-to-r from-primary-500 to-secondary-500',
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    accent: 'bg-accent-500',
    light: 'bg-gray-50 dark:bg-gray-900',
    transparent: 'bg-transparent',
  };

  const backgroundClass = backgrounds[background];
  const isLight = background === 'light' || background === 'transparent';
  const textColorClass = isLight 
    ? 'text-gray-900 dark:text-white' 
    : 'text-white';

  return (
    <div className={`py-8 md:py-12 ${backgroundClass}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <motion.h1 
              className={`text-3xl md:text-4xl font-bold ${textColorClass}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p 
                className={`mt-2 text-lg ${isLight ? 'text-gray-600 dark:text-gray-400' : 'text-white/80'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {action && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {action}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;