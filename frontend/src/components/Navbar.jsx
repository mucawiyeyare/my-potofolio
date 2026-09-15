import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const checkAuth = () => setIsAdmin(localStorage.getItem('adminAuth') === 'true');
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b transition-shadow duration-300 ${
      scrolled ? 'border-gray-200 dark:border-gray-700 shadow-md' : 'border-transparent shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 max-w-[68%] sm:max-w-none">
            <button
              type="button"
              onClick={() => setShowPhoto(true)}
              title="View photo"
              className="flex-shrink-0 rounded-full group"
            >
              <img
                src="/profile.jpg"
                alt="Eng. Abdirahman"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-900 dark:border-white shadow-sm group-hover:scale-105 transition-transform duration-200"
              />
            </button>
            <Link to="/" className="flex items-center min-w-0 group">
              <div className="font-bold text-gray-900 dark:text-white truncate">
                <span className="hidden sm:inline text-lg sm:text-xl">Eng.Abdirahman Mohamed Ibrahim</span>
                <span className="sm:hidden text-sm font-bold truncate">Eng. Abdirahman</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${
                  isActive(item.path)
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.name}
                {!isActive(item.path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gray-900 dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                )}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
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
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium shadow-md hover:bg-black dark:hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </Link>
            )}

            {/* GitHub Profile Link */}
            <a
              href="https://github.com/mucawiyeyare"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              GitHub
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:-translate-y-0.5 hover:rotate-12 transition-all duration-200"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {isDark ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
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
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
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
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-3 py-2 mt-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-base font-medium rounded-lg shadow-md hover:bg-black dark:hover:bg-gray-200 transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </nav>

    {/* Profile Photo Modal */}
    {showPhoto && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowPhoto(false)}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-sm w-full"
        >
          <button
            type="button"
            onClick={() => setShowPhoto(false)}
            aria-label="Close"
            className="absolute -top-10 right-0 sm:-right-10 sm:top-0 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-200"
          >
            Close
          </button>
          <img
            src="/profile.jpg"
            alt="Eng. Abdirahman Mohamed Ibrahim"
            className="w-full rounded-2xl border-4 border-white/20 shadow-2xl object-cover"
          />
        </motion.div>
      </motion.div>
    )}
    </>
  );
};

export default Navbar;
