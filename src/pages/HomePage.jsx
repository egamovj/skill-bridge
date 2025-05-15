import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import SkillGrid from '../components/skills/SkillGrid';
import { mockSkills } from '../data/mockData';

const HomePage = () => {
  // Get featured and recent skills
  const featuredSkills = mockSkills.filter(skill => skill.isFeatured).slice(0, 4);
  const recentSkills = mockSkills
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Share & Learn Bite-sized Skills</h1>
              <p className="text-xl text-white/80 mb-6">
                Master new skills in under 5 minutes. Learn from peers, share your expertise, and build your knowledge library one micro-skill at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button to="/explore" size="lg" variant="accent" icon={<Sparkles />}>
                  Explore Skills
                </Button>
                <Button to="/request" size="lg" variant="outline" className="text-white border-white">
                  Request a Skill
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <img 
                  src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="People sharing skills" 
                  className="rounded-xl shadow-2xl w-full"
                />
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-around">
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users size={18} />
                    </div>
                    <p className="text-sm font-medium">1,200+ Teachers</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Sparkles size={18} />
                    </div>
                    <p className="text-sm font-medium">5,000+ Skills</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock size={18} />
                    </div>
                    <p className="text-sm font-medium">5 Mins or Less</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Skills Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Skills</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Top-rated micro-lessons from our community</p>
            </div>
            <Button to="/explore" variant="link" iconPosition="right" icon={<ArrowRight />}>
              View all
            </Button>
          </div>
          
          <SkillGrid skills={featuredSkills} featuredIndex={0} />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 dark:bg-gray-850">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How SkillBridge Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform connects people who want to learn with those who love to teach - in bite-sized, actionable lessons.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Skill</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our library of micro-skills across various categories, or search for something specific you want to learn.
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center text-secondary-600 dark:text-secondary-400 mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn in Minutes</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every skill is taught in 5 minutes or less, making it easy to fit learning into your busy schedule.
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900 rounded-full flex items-center justify-center text-accent-600 dark:text-accent-400 mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Skills</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Have expertise to share? Create your own micro-lessons and build your reputation in the community.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-10">
            <Button to="/explore" size="lg" variant="primary">Get Started Today</Button>
          </div>
        </div>
      </section>

      {/* Recent Skills Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Recently Added</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">The newest skills from our community</p>
            </div>
            <Button to="/explore" variant="link" iconPosition="right" icon={<ArrowRight />}>
              View all
            </Button>
          </div>
          
          <SkillGrid skills={recentSkills} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a skill to share?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Everyone has something valuable to teach. Share your expertise with the world in just 5 minutes or less.
          </p>
          <Button to="/profile/johndoe" size="lg" variant="light" className="bg-white text-accent-600">
            Start Teaching Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;