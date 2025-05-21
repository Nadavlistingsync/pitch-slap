'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiTrash2, FiArchive, FiMail, FiCheck, FiClock } from 'react-icons/fi';

interface Feedback {
  id: string;
  title: string;
  preview: string;
  date: string;
  time: string;
  isRead: boolean;
  roastScore: number;
  vcName: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading feedback data
    setTimeout(() => {
      setFeedbacks([
        {
          id: '1',
          title: 'Your pitch deck needs work',
          preview: 'The market size slide is way too optimistic. You need to be more realistic...',
          date: 'Today',
          time: '2:30 PM',
          isRead: false,
          roastScore: 87,
          vcName: 'Sarah Chen'
        },
        {
          id: '2',
          title: 'Brutal feedback on your deck',
          preview: 'Your financial projections are completely unrealistic. No investor will...',
          date: 'Yesterday',
          time: '4:15 PM',
          isRead: true,
          roastScore: 92,
          vcName: 'Michael Rodriguez'
        },
        {
          id: '3',
          title: 'Pitch deck review results',
          preview: 'The problem statement is weak. You need to better articulate why...',
          date: 'Mar 15',
          time: '11:20 AM',
          isRead: true,
          roastScore: 75,
          vcName: 'Alex Thompson'
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const toggleSelectAll = () => {
    if (selectedFeedbacks.length === feedbacks.length) {
      setSelectedFeedbacks([]);
    } else {
      setSelectedFeedbacks(feedbacks.map(f => f.id));
    }
  };

  const toggleSelectFeedback = (id: string) => {
    setSelectedFeedbacks(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    );
  };

  const getRoastScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-500';
    if (score >= 80) return 'text-orange-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-xl font-medium text-gray-800">PitchDeck</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="max-w-2xl w-full relative">
            <input
              type="text"
              placeholder="Search feedback..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
            U
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40">
        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload Deck
          </button>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FiMail className="w-5 h-5 text-gray-500" />
            Inbox
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FiStar className="w-5 h-5 text-gray-500" />
            Starred
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FiClock className="w-5 h-5 text-gray-500" />
            Snoozed
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
            <FiCheck className="w-5 h-5 text-gray-500" />
            Done
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Email-like List View */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-500 rounded"
                    checked={selectedFeedbacks.length === feedbacks.length}
                    onChange={toggleSelectAll}
                  />
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <FiArchive className="w-5 h-5 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <FiTrash2 className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">1-{feedbacks.length} of {feedbacks.length}</span>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Items */}
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                <div className="p-4 text-center text-gray-500">Loading feedback...</div>
              ) : (
                feedbacks.map((feedback) => (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                      !feedback.isRead ? 'bg-blue-50' : ''
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-500 rounded mr-4"
                      checked={selectedFeedbacks.includes(feedback.id)}
                      onChange={() => toggleSelectFeedback(feedback.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium ${!feedback.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                            {feedback.vcName}
                          </span>
                          <span className={`text-sm ${getRoastScoreColor(feedback.roastScore)}`}>
                            Roast Score: {feedback.roastScore}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{feedback.date}</span>
                          <span className="text-sm text-gray-500">{feedback.time}</span>
                        </div>
                      </div>
                      <p className={`text-sm ${!feedback.isRead ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {feedback.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {feedback.preview}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 