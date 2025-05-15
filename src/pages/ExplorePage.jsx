import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import CategoryFilter from '../components/skills/CategoryFilter';
import SkillGrid from '../components/skills/SkillGrid';
import { mockSkills, mockCategories } from '../data/mockData';

const ExplorePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSkills = mockSkills.filter(skill => {
    const matchesCategory = activeCategory === 'all' || 
      skill.category.toLowerCase() === activeCategory;
    
    const matchesSearch = searchTerm === '' || 
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader 
        title="Explore Skills" 
        subtitle="Discover bite-sized skills you can learn in minutes"
        action={
          <Button 
            to="/request" 
            variant="accent"
            size="lg"
            icon={<Plus size={18} />}
          >
            Request a Skill
          </Button>
        }
        background="light"
      />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto md:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <CategoryFilter 
          categories={mockCategories} 
          activeCategory={activeCategory} 
          onChange={setActiveCategory} 
        />
        
        {/* Results */}
        {filteredSkills.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SkillGrid skills={filteredSkills} />
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No skills found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
            <Button variant="primary" onClick={() => {setSearchTerm(''); setActiveCategory('all');}}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;