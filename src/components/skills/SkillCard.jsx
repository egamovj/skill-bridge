import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Star, Share2, Bookmark } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { motion } from 'framer-motion';

const SkillCard = ({ skill, featured = false }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const shareSkill = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Sharing: ${skill.title}`);
  };

  return (
    <Card 
      variant={featured ? 'elevated' : 'default'} 
      className={`h-full flex flex-col ${featured ? '' : ''}`}
      interactive
    >
      <Link to={`/lesson/${skill.id}`} className="flex flex-col h-full">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={skill.imageUrl} 
            alt={skill.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-2 left-2 flex items-center space-x-1">
            <Badge variant="accent" className="flex items-center space-x-1">
              <Clock size={12} />
              <span>{skill.duration} min</span>
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-2 right-2 flex space-x-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleBookmark}
              className={`p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm
                ${isBookmarked ? 'text-accent-500' : 'text-gray-600 dark:text-gray-400'}`}
            >
              <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={shareSkill}
              className="p-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm text-gray-600 dark:text-gray-400"
            >
              <Share2 size={16} />
            </motion.button>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="flex-grow p-4 flex flex-col">
          {/* Category */}
          <div className="mb-2">
            <Badge variant="secondary">{skill.category}</Badge>
            {skill.isFeatured && <Badge variant="primary" className="ml-2">Featured</Badge>}
          </div>
          
          {/* Title & Description */}
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{skill.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{skill.description}</p>
          
          {/* Author & Stats - At the bottom of the card */}
          <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src={skill.creator.avatar} 
                  alt={skill.creator.name} 
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{skill.creator.name}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Star size={14} className="text-warning-500 mr-1" />
                  <span>{skill.rating}</span>
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-1" />
                  <span>{skill.learners}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default SkillCard;