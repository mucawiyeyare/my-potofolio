import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaTimes } from 'react-icons/fa';
import { contactAPI } from '../utils/api';

const MessageNotification = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [lastCheck, setLastCheck] = useState(Date.now());

  useEffect(() => {
    // Check for new messages every 30 seconds
    const interval = setInterval(checkForNewMessages, 30000);
    
    // Initial check
    checkForNewMessages();

    return () => clearInterval(interval);
  }, []);

  const checkForNewMessages = async () => {
    try {
      const response = await contactAPI.getAll();
      const messages = response.data.messages || [];
      const unread = messages.filter(msg => !msg.read);
      const newMessages = messages.filter(msg => 
        new Date(msg.createdAt).getTime() > lastCheck && !msg.read
      );

      setUnreadCount(unread.length);

      if (newMessages.length > 0) {
        setShowNotification(true);
        setLastCheck(Date.now());
      }
    } catch (error) {
      console.error('Error checking for new messages:', error);
    }
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  const handleViewMessages = () => {
    setShowNotification(false);
    window.location.href = '/admin';
  };

  return (
    <>
      {/* Floating notification badge */}
      {unreadCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button
            onClick={handleViewMessages}
            className="relative p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            title={`${unreadCount} unread messages`}
          >
            <FaEnvelope className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          </button>
        </motion.div>
      )}

      {/* New message notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 50 }}
            className="fixed bottom-20 right-4 z-50 max-w-sm"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
                    <FaEnvelope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      New Message Received!
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      You have new contact form submissions to review.
                    </p>
                    <button
                      onClick={handleViewMessages}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2"
                    >
                      View Messages
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MessageNotification;