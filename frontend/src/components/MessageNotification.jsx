import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
            className="relative px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full shadow-lg hover:bg-black dark:hover:bg-gray-200 transition-colors text-sm font-semibold"
            title={`${unreadCount} unread messages`}
          >
            Messages
            <span className="absolute -top-2 -right-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-900 dark:border-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
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
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    New Message Received
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    You have new contact form submissions to review.
                  </p>
                  <button
                    onClick={handleViewMessages}
                    className="text-sm text-gray-900 dark:text-white font-semibold hover:underline mt-2"
                  >
                    View Messages
                  </button>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-3"
                  aria-label="Dismiss"
                >
                  Close
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
