// App Configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Personal Portfolio',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5001/api'),
};

// Personal Information
export const PERSONAL_INFO = {
  name: 'Eng Abdirahman Mohamed Ibrahim',
  title: 'Full-Stack Developer & UI/UX Specialist',
  email: 'Abdirah916@gmail.com',
  phone: '+252 616408886',
  location: 'Mogadishu, Somalia',
  bio: `I'm a passionate full-stack developer, Web Development Teacher & Administrator at Iftiinhub College for the past year, and Class Student Assistant at Hormuud University (Faculty of Computer Science). My expertise spans React, Node.js, JavaScript, MongoDB, Express, and database management.`,
  
  // Social Links
  social: {
    github: 'https://github.com/mucawiyeyare',
    linkedin: 'https://linkedin.com/in/mucawiyeyare',
    twitter: 'https://twitter.com/mucawiyeyare',
    email: 'mailto:Abdirah916@gmail.com',
  },
  
  // Resume/CV
  resumeUrl: '/resume.pdf',
};

// Skills Configuration
export const SKILLS_CONFIG = {
  frontend: [
    { name: 'React', level: 90, color: 'text-blue-500' },
    { name: 'JavaScript', level: 95, color: 'text-yellow-500' },
    { name: 'TypeScript', level: 85, color: 'text-blue-600' },
    { name: 'Tailwind CSS', level: 85, color: 'text-cyan-500' },
    { name: 'HTML/CSS', level: 95, color: 'text-orange-500' },
    { name: 'Vue.js', level: 75, color: 'text-green-500' },
  ],
  backend: [
    { name: 'Node.js', level: 88, color: 'text-green-500' },
    { name: 'Python', level: 80, color: 'text-blue-600' },
    { name: 'Express.js', level: 85, color: 'text-gray-600' },
    { name: 'REST APIs', level: 90, color: 'text-purple-500' },
    { name: 'GraphQL', level: 70, color: 'text-pink-500' },
  ],
  database: [
    { name: 'MongoDB', level: 85, color: 'text-green-600' },
    { name: 'PostgreSQL', level: 75, color: 'text-blue-700' },
    { name: 'Redis', level: 70, color: 'text-red-500' },
    { name: 'MySQL', level: 80, color: 'text-blue-600' },
  ],
  tools: [
    { name: 'Git', level: 90, color: 'text-orange-600' },
    { name: 'Docker', level: 75, color: 'text-blue-500' },
    { name: 'AWS', level: 70, color: 'text-yellow-600' },
    { name: 'Vercel', level: 85, color: 'text-black' },
  ],
};

// Navigation Configuration
export const NAVIGATION = [
  { name: 'Home', path: '/', icon: 'FaHome' },
  { name: 'About', path: '/about', icon: 'FaUser' },
  { name: 'Profile', path: '/profile', icon: 'FaBriefcase' },
  { name: 'Contact', path: '/contact', icon: 'FaEnvelope' },
];

// Theme Configuration
export const THEME_CONFIG = {
  defaultTheme: 'light',
  storageKey: 'theme',
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  pageTransition: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.5 },
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
};

// SEO Configuration
export const SEO_CONFIG = {
  defaultTitle: 'Personal Portfolio - Full-Stack Developer',
  titleTemplate: '%s | Personal Portfolio',
  defaultDescription: 'Full-stack developer passionate about creating innovative solutions and beautiful user experiences.',
  siteUrl: 'https://your-domain.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@yourusername',
};

// Contact Form Configuration
export const CONTACT_CONFIG = {
  maxNameLength: 100,
  maxSubjectLength: 200,
  maxMessageLength: 1000,
  minNameLength: 2,
  minSubjectLength: 5,
  minMessageLength: 10,
};