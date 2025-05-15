import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Users, Star, ThumbsUp, MessageCircle, Share2, Bookmark, Award } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { mockSkills, mockComments } from '../data/mockData';

const LessonPage = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [relatedSkills, setRelatedSkills] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    
    setTimeout(() => {
      const foundSkill = mockSkills.find(s => s.id === id);
      setSkill(foundSkill);
      
      // Get related skills (same category)
      if (foundSkill) {
        const related = mockSkills
          .filter(s => s.category === foundSkill.category && s.id !== foundSkill.id)
          .slice(0, 3);
        setRelatedSkills(related);
      }
      
      // Get comments for this skill
      const skillComments = mockComments.filter(c => c.skillId === id);
      setComments(skillComments);
      
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Create new comment
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      skillId: id,
      userId: 'currentUser',
      userName: 'You',
      userAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      isHelpful: false,
    };
    
    setComments([...comments, newCommentObj]);
    setNewComment('');
  };
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ));
  };
  
  const handleMarkHelpful = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isHelpful: !comment.isHelpful } 
        : comment
    ));
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        </div>
      </div>
    );
  }
  
  if (!skill) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Skill Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The skill you're looking for doesn't exist or has been removed.</p>
        <Button to="/explore" variant="primary" icon={<ChevronLeft />}>
          Back to Explore
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Lesson Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/explore" className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 flex items-center">
              <ChevronLeft size={18} />
              <span>Back to Explore</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant={isBookmarked ? 'accent' : 'ghost'} 
                size="sm"
                icon={<Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />}
                onClick={toggleBookmark}
              >
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Share2 size={18} />}
                onClick={() => alert(`Sharing: ${skill.title}`)}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Skill Info */}
              <div className="mb-6">
                <Badge variant="secondary" className="mb-2">{skill.category}</Badge>
                <h1 className="text-3xl font-bold mb-3">{skill.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{skill.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{skill.duration} min</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>{skill.learners} learners</span>
                  </div>
                  <div className="flex items-center text-warning-500">
                    <Star size={16} fill="currentColor" className="mr-1" />
                    <span>{skill.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Link to={`/profile/${skill.creator.id}`} className="flex items-center hover:text-primary-500">
                      <img 
                        src={skill.creator.avatar} 
                        alt={skill.creator.name} 
                        className="w-5 h-5 rounded-full mr-1"
                      />
                      <span>{skill.creator.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            
              {/* Video/Content */}
              <Card className="mb-8">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={skill.imageUrl} 
                    alt={skill.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {skill.content}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {skill.tags.map(tag => (
                      <Badge key={tag} variant="default">#{tag}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            
              {/* Comments Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Discussion ({comments.length})</h2>
                
                {/* Comment Form */}
                <Card className="mb-6">
                  <div className="p-4">
                    <form onSubmit={handleCommentSubmit}>
                      <textarea
                        className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                        placeholder="Share your thoughts or ask a question..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      ></textarea>
                      <div className="mt-3 flex justify-end">
                        <Button 
                          type="submit" 
                          variant="primary"
                          disabled={!newComment.trim()}
                        >
                          Comment
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>
                
                {/* Comments List */}
                {comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map(comment => (
                      <Card key={comment.id} className="overflow-visible">
                        <div className="p-4">
                          <div className="flex items-start mb-3">
                            <img 
                              src={comment.userAvatar} 
                              alt={comment.userName} 
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-900 dark:text-white mr-2">
                                  {comment.userName}
                                </span>
                                {comment.isHelpful && (
                                  <Badge variant="success" size="sm" className="flex items-center">
                                    <Award size={12} className="mr-1" />
                                    <span>Helpful</span>
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            {comment.content}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <button 
                              className="flex items-center text-gray-500 hover:text-primary-500"
                              onClick={() => handleLikeComment(comment.id)}
                            >
                              <ThumbsUp size={14} className="mr-1" />
                              <span>{comment.likes}</span>
                            </button>
                            
                            <button
                              className="flex items-center text-gray-500 hover:text-success-500"
                              onClick={() => handleMarkHelpful(comment.id)}
                            >
                              <Award size={14} className="mr-1" />
                              <span>{comment.isHelpful ? 'Marked Helpful' : 'Mark as Helpful'}</span>
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle size={36} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Creator Info */}
              <Card className="mb-6">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">About the Creator</h3>
                  <div className="flex items-center mb-3">
                    <img 
                      src={skill.creator.avatar} 
                      alt={skill.creator.name} 
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <Link to={`/profile/${skill.creator.id}`} className="font-medium text-gray-900 dark:text-white hover:text-primary-500">
                        {skill.creator.name}
                      </Link>
                      <p className="text-sm text-gray-500">Skill Creator</p>
                    </div>
                  </div>
                  <Button to={`/profile/${skill.creator.id}`} variant="outline" fullWidth>
                    View Profile
                  </Button>
                </div>
              </Card>
              
              {/* Related Skills */}
              <Card>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Related Skills</h3>
                  {relatedSkills.length > 0 ? (
                    <div className="space-y-4">
                      {relatedSkills.map(related => (
                        <Link 
                          key={related.id} 
                          to={`/lesson/${related.id}`}
                          className="block"
                        >
                          <div className="flex items-start hover:bg-gray-50 dark:hover:bg-gray-850 p-2 rounded-lg transition-colors">
                            <img 
                              src={related.imageUrl} 
                              alt={related.title} 
                              className="w-16 h-16 object-cover rounded mr-3"
                            />
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                {related.title}
                              </h4>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Clock size={14} className="mr-1" />
                                <span>{related.duration} min</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      
                      <Button to="/explore" variant="link" fullWidth>
                        Browse More Skills
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No related skills found.
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;