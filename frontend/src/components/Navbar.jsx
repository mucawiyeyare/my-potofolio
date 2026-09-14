import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { FaSignInAlt, FaSignOutAlt, FaTachometerAlt, FaGithub } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';
import { PERSONAL_INFO } from '../utils/constants';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const checkAuth = () => setIsAdmin(localStorage.getItem('adminAuth') === 'true');
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Re-check on every route change (handles login/logout within same tab)
  useEffect(() => {
    setIsAdmin(localStorage.getItem('adminAuth') === 'true');
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAdmin(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0 max-w-[68%] sm:max-w-none">
            <img
              src="/profile.jpg"
              alt="Eng. Abdirahman"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-blue-500 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
            />
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate"
            >
              <span className="hidden sm:inline text-lg sm:text-xl">Eng.Abdirahman Mohamed Ibrahim</span>
              <span className="sm:hidden text-sm font-bold truncate">Eng. Abdirahman</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Auth Button */}
            {isAdmin ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive('/admin')
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <FaTachometerAlt className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                >
                  <FaSignOutAlt className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
              >
                <FaSignInAlt className="w-4 h-4 mr-2" />
                Sign In
              </Link>
            )}

            {/* GitHub Profile Link */}
            <a
              href="https://github.com/mucawiyeyare"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <FaGithub className="w-5 h-5" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
              {isAdmin ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                      isActive('/admin')
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <FaTachometerAlt className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <FaSignOutAlt className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <FaSignInAlt className="w-5 h-5 mr-3" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;