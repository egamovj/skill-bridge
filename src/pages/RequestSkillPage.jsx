import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ChevronUp, MessageCircle } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { mockRequests, mockCategories } from '../data/mockData';

const RequestSkillPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description || !category) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
  
  // Sort requests by upvotes (highest first)
  const sortedRequests = [...mockRequests].sort((a, b) => b.upvotes - a.upvotes);
  
  return (
    <div>
      <PageHeader 
        title="Request a Skill" 
        subtitle="Don't see the skill you want to learn? Request it from our community."
        background="light"
      />
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="sticky top-20">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Submit a Request</h2>
                  
                  {isSuccess ? (
                    <div className="bg-success-50 dark:bg-success-900/20 text-success-800 dark:text-success-200 p-4 rounded-lg mb-4">
                      <p>Your request has been submitted successfully!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., How to create a personal budget in Excel"
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                          required
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Describe what you want to learn and why it would be valuable..."
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                          rows={4}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                          required
                        >
                          <option value="">Select a category</option>
                          {mockCategories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <Button 
                        type="submit" 
                        variant="primary" 
                        icon={<Send />}
                        fullWidth
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </Button>
                    </form>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
          
          {/* Requests List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Community Requests</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Vote for requests you're interested in learning. The most popular requests are more likely to be created.
            </p>
            
            {sortedRequests.length > 0 ? (
              <div className="space-y-4">
                {sortedRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No requests yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Be the first to request a skill from our community!
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ request }) => {
  const [upvotes, setUpvotes] = useState(request.upvotes);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleUpvote = () => {
    if (hasVoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    setHasVoted(!hasVoted);
  };
  
  const getStatusBadge = () => {
    switch (request.status) {
      case 'open':
        return <Badge variant="primary">Open</Badge>;
      case 'in-progress':
        return <Badge variant="accent">In Progress</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="overflow-visible">
      <div className="p-6">
        <div className="flex">
          {/* Upvote Button */}
          <div className="mr-4 flex flex-col items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${
                hasVoted 
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={handleUpvote}
            >
              <ChevronUp size={20} />
            </motion.button>
            <span className="font-bold mt-1">{upvotes}</span>
          </div>
          
          {/* Request Content */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge variant="secondary">{request.category}</Badge>
              {getStatusBadge()}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{request.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{request.description}</p>
            
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <img 
                  src={request.requestedBy.avatar} 
                  alt={request.requestedBy.name} 
                  className="w-5 h-5 rounded-full mr-2"
                />
                <span>Requested by <span className="font-medium">{request.requestedBy.name}</span></span>
                <span className="mx-2">•</span>
                <span>{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
              
              {request.status === 'in-progress' && request.fulfilledBy && (
                <Badge variant="accent" className="mt-2 sm:mt-0">
                  Being created by {request.fulfilledBy.name}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RequestSkillPage;