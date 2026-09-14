import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: FaGithub,
      url: 'https://github.com/mucawiyeyare',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/mucawiyeyare',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/mucawiyeyare',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: FaEnvelope,
      url: 'mailto:abdirahm916@gmail.com',
      color: 'hover:text-red-500'
    }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Eng. Abdirahman
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
              Full-stack developer &amp; data analyst passionate about creating innovative production solutions 
              and beautiful user experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <div className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About', path: '/about' },
                { label: 'Projects', path: '/projects' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Connect With Me
            </h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} transition-colors duration-200`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <FaHeart className="text-red-500 mx-1" /> by Eng.Abdirahman 
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;