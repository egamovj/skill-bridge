import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  // Variant styles
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white',
    outline: 'bg-transparent border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
    link: 'bg-transparent text-primary-500 hover:underline p-0',
  };

  // Size styles
  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
    xl: 'text-lg px-8 py-4',
  };

  // Base styles
  const baseStyles = `
    font-medium rounded-md transition-all duration-200 
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${variants[variant]} 
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Icon rendering
  const renderIcon = () => {
    if (!icon) return null;
    return React.cloneElement(icon, {
      size: size === 'sm' ? 14 : size === 'md' ? 16 : size === 'lg' ? 18 : 20,
      className: `${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`
    });
  };

  const content = (
    <>
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </>
  );

  // Motion animation props
  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.1 }
  };

  // Render based on link type
  if (to) {
    return (
      <motion.div {...motionProps}>
        <Link to={to} className={baseStyles} {...props}>
          {content}
        </Link>
      </motion.div>
    );
  } else if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={baseStyles} {...props}>
          {content}
        </a>
      </motion.div>
    );
  } else {
    return (
      <motion.button
        {...motionProps}
        className={baseStyles}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {content}
      </motion.button>
    );
  }
};

export default Button;