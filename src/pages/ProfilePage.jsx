import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Edit, Award, BookOpen, Upload, Settings } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import SkillGrid from '../components/skills/SkillGrid';
import PageHeader from '../components/common/PageHeader';
import EditProfileModal from '../components/profile/EditProfileModal';
import { mockUsers, mockSkills } from '../data/mockData';

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.username === username);
      setUser(foundUser);
      
      // Get skills created by user
      if (foundUser) {
        const skills = mockSkills.filter(s => s.creator.id === foundUser.id);
        setUserSkills(skills);
      }
      
      setIsLoading(false);
    }, 500);
  }, [username]);

  const handleEditProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData
    }));
    // In a real app, this would make an API call to update the user data
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-8"></div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">User Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The user you're looking for doesn't exist or has been removed.</p>
        <Button to="/" variant="primary">Go Home</Button>
      </div>
    );
  }
  
  const isCurrentUser = username === 'johndoe'; // Mock current user
  
  return (
    <div>
      <PageHeader 
        title={isCurrentUser ? 'Your Profile' : `${user.name}'s Profile`}
        background="light"
      />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="overflow-visible">
              <div className="p-6 text-center">
                <div className="relative inline-block">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-md"
                  />
                  {isCurrentUser && (
                    <button 
                      className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full border-2 border-white dark:border-gray-800"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <Edit size={14} />
                    </button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
                
                <div className="flex justify-center mt-2 space-x-2">
                  <Badge variant="primary">Teacher</Badge>
                  <Badge variant="secondary">Learner</Badge>
                </div>
                
                <p className="mt-4 text-gray-600 dark:text-gray-400">{user.bio}</p>
                
                {isCurrentUser ? (
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      icon={<Upload />}
                      fullWidth
                      className="mb-2"
                    >
                      Create New Skill
                    </Button>
                    <Button 
                      variant="ghost" 
                      icon={<Settings />}
                      fullWidth
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button 
                      variant="primary" 
                      fullWidth
                    >
                      Follow
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium mb-4">Info</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <User className="w-5 h-5 mr-3" />
                    <span>{user.username}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="w-5 h-5 mr-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="w-5 h-5 mr-3" />
                    <span>Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long'
                    })}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium mb-4">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <Badge key={skill} variant="secondary">
                      {skill.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-medium mb-4">Stats</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-primary-500">{userSkills.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Created Skills</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-500">12</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Skills Learned</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-accent-500">128</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-success-500">4.8</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Rating</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto">
                <button
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === 'created' 
                      ? 'text-primary-500 border-b-2 border-primary-500' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  onClick={() => setActiveTab('created')}
                >
                  <Upload size={16} className="inline mr-1" />
                  Created Skills
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === 'learned' 
                      ? 'text-primary-500 border-b-2 border-primary-500' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  onClick={() => setActiveTab('learned')}
                >
                  <BookOpen size={16} className="inline mr-1" />
                  Learned Skills
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm whitespace-nowrap
                    ${activeTab === 'achievements' 
                      ? 'text-primary-500 border-b-2 border-primary-500' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  onClick={() => setActiveTab('achievements')}
                >
                  <Award size={16} className="inline mr-1" />
                  Achievements
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'created' && (
                <div>
                  {userSkills.length > 0 ? (
                    <SkillGrid skills={userSkills} />
                  ) : (
                    <Card className="p-8 text-center">
                      <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No skills created yet</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {isCurrentUser 
                          ? "You haven't created any skills yet. Share your expertise with the community!"
                          : `${user.name} hasn't created any skills yet.`
                        }
                      </p>
                      {isCurrentUser && (
                        <Button variant="primary" icon={<Upload />}>
                          Create Your First Skill
                        </Button>
                      )}
                    </Card>
                  )}
                </div>
              )}
              
              {activeTab === 'learned' && (
                <Card className="p-8 text-center">
                  <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Learning History</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {isCurrentUser 
                      ? "Track the skills you've learned and your progress."
                      : `See what ${user.name} has been learning.`
                    }
                  </p>
                  <Button variant="primary" to="/explore">
                    Explore Skills
                  </Button>
                </Card>
              )}
              
              {activeTab === 'achievements' && (
                <Card className="p-8 text-center">
                  <Award size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Achievements</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Earn badges and achievements as you create and learn new skills.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center w-24">
                      <Award size={32} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Coming Soon</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center w-24">
                      <Award size={32} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Coming Soon</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center w-24">
                      <Award size={32} className="mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Coming Soon</span>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleEditProfile}
      />
    </div>
  );
};

export default ProfilePage;