import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, onChange }) => {
  return (
    <div className="mb-6 overflow-x-auto scrollbar-hide">
      <div className="flex space-x-2 pb-2">
        <CategoryButton 
          isActive={activeCategory === 'all'} 
          onClick={() => onChange('all')}
        >
          All
        </CategoryButton>
        
        {categories.map(category => (
          <CategoryButton 
            key={category.id} 
            isActive={activeCategory === category.id}
            onClick={() => onChange(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
    </div>
  );
};

const CategoryButton = ({ children, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
        transition-colors duration-200
        ${isActive 
          ? 'bg-primary-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export default CategoryFilter;