import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Search, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Request Skill', path: '/request' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GraduationCap size={32} className="text-primary-500" />
            </motion.div>
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">SkillBridge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors hover:text-primary-500
                  ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button 
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link 
              to="/profile/johndoe"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
            >
              <span className="text-sm font-medium">Profile</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar (Desktop) */}
        {isSearchOpen && (
          <motion.div 
            className="hidden md:block py-3 border-t border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for skills..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                autoFocus
              />
            </div>
          </motion.div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <div className="relative mb-6">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for skills..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                />
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => 
                      `text-lg font-medium py-2 transition-colors hover:text-primary-500
                      ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                    }
                    onClick={toggleMenu}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <NavLink
                  to="/profile/johndoe"
                  className={({ isActive }) => 
                    `text-lg font-medium py-2 transition-colors hover:text-primary-500
                    ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                  }
                  onClick={toggleMenu}
                >
                  Profile
                </NavLink>
              </nav>

              {/* Mobile Theme Toggle */}
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button 
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? (
                    <>
                      <Moon size={20} />
                      <span>Switch to dark mode</span>
                    </>
                  ) : (
                    <>
                      <Sun size={20} />
                      <span>Switch to light mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;