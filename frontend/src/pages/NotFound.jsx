import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>

          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist. It might have been moved,
            deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-all duration-200 shadow-lg"
          >
            Go Home
          </Link>

          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
