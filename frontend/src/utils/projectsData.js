// Central Project Storage & Management Service
export const INITIAL_PROJECTS = [
  {
    id: 'snabdental',
    name: 'snabdental',
    title: 'SNAB Dental & Dermatologic Clinic',
    domain: 'snabdental.iftiinhub.com',
    logo: 'https://snabdental.iftiinhub.com/logo.png',
    logoFallback: '🦷',
    logoBg: 'from-blue-600 to-blue-800',
    description: 'A modern dental management system for clinics to securely store patient records, treatment histories, and appointments in one centralized system.',
    tech: ['HTML', 'CSS', 'JS', 'ReactJS', 'NodeJS', 'MongoDB'],
    live: 'https://snabdental.iftiinhub.com',
    github: 'https://github.com/mucawiyeyare',
    category: 'Fullstack',
    featured: true,
  },
  {
    id: 'dhiigkaal',
    name: 'dhiigkaal',
    title: 'DHIIG KAAL – Blood Donation System',
    domain: 'dhiigkaal.iftiinhub.com',
    logo: 'https://dhiigkaal.iftiinhub.com/logo.jpg',
    logoFallback: '🩸',
    logoBg: 'from-red-500 to-red-700',
    description: 'A blood donation platform connecting donors with patients. Tracks donations, manages donor records, blood inventory, and coordinates transfusions.',
    tech: ['ReactJS', 'NodeJS', 'MongoDB', 'Tailwind', 'Express'],
    live: 'https://dhiigkaal.iftiinhub.com',
    github: 'https://github.com/mucawiyeyare',
    category: 'Fullstack',
    featured: true,
  },
  {
    id: 'iftiinhub',
    name: 'iftiinhub',
    title: 'IftiinHub – Online Learning Platform',
    domain: 'iftiinhub.com',
    logo: 'https://iftiinhub.com/logo-transparent.png',
    logoFallback: '📚',
    logoBg: 'from-indigo-500 to-indigo-700',
    description: 'A full-featured e-learning platform providing students and professionals access to quality online courses with progress tracking and interactive lessons.',
    tech: ['ReactJS', 'NodeJS', 'MongoDB', 'Tailwind', 'Express'],
    live: 'https://iftiinhub.com',
    github: 'https://github.com/mucawiyeyare',
    category: 'Fullstack',
    featured: true,
  },
  {
    id: 'ntw',
    name: 'ntw',
    title: 'National Training Week – Hormuud University',
    domain: 'ntw.hu.edu.so',
    logo: 'https://ntw.hu.edu.so/favicon-light.png',
    logoFallback: '🎓',
    logoBg: 'from-teal-500 to-teal-700',
    description: 'Intensive online technical training platform for Hormuud University — live sessions, verified certificates, attendance tracking and performance analytics.',
    tech: ['ReactJS', 'NodeJS', 'PostgreSQL', 'Python', 'Charts'],
    live: 'https://ntw.hu.edu.so',
    github: 'https://github.com/mucawiyeyare',
    category: 'Fullstack + Data',
    featured: true,
  },
];

const STORAGE_KEY = 'portfolio_projects_v2';

export const getStoredProjects = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure initial 4 projects exist if user hasn't deleted them
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load projects from localStorage:', e);
  }
  // Initialize storage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  } catch (e) {}
  return INITIAL_PROJECTS;
};

export const saveStoredProjects = (projects) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    // Notify all listening components
    window.dispatchEvent(new CustomEvent('portfolio_projects_updated', { detail: projects }));
  } catch (e) {
    console.error('Failed to save projects to localStorage:', e);
  }
};
