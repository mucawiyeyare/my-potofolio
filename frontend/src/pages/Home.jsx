import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCode, FaRocket, FaPalette, FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';

const TOP_LIVE_PROJECTS = [
  {
    name: 'snabdental',
    title: 'SNAB Dental & Dermatologic Clinic',
    domain: 'snabdental.iftiinhub.com',
    logo: 'https://snabdental.iftiinhub.com/logo.png',
    logoFallback: '🦷',
    logoBg: 'from-blue-600 to-blue-800',
    description: 'A modern dental management system for clinics to securely store patient records, treatment histories, and appointments in one centralized system.',
    tech: ['HTML', 'CSS', 'JS', 'ReactJS', 'NodeJS', 'MongoDB'],
    live: 'https://snabdental.iftiinhub.com',
    category: 'Fullstack',
  },
  {
    name: 'dhiigkaal',
    title: 'DHIIG KAAL – Blood Donation System',
    domain: 'dhiigkaal.iftiinhub.com',
    logo: 'https://dhiigkaal.iftiinhub.com/logo.jpg',
    logoFallback: '🩸',
    logoBg: 'from-red-500 to-red-700',
    description: 'A blood donation platform connecting donors with patients. Tracks donations, manages donor records, blood inventory, and coordinates transfusions.',
    tech: ['ReactJS', 'NodeJS', 'MongoDB', 'Tailwind', 'Express'],
    live: 'https://dhiigkaal.iftiinhub.com',
    category: 'Fullstack',
  },
  {
    name: 'iftiinhub',
    title: 'IftiinHub – Online Learning Platform',
    domain: 'iftiinhub.com',
    logo: 'https://iftiinhub.com/logo-transparent.png',
    logoFallback: '📚',
    logoBg: 'from-indigo-500 to-indigo-700',
    description: 'A full-featured e-learning platform providing students and professionals access to quality online courses with progress tracking and interactive lessons.',
    tech: ['ReactJS', 'NodeJS', 'MongoDB', 'Tailwind', 'Express'],
    live: 'https://iftiinhub.com',
    category: 'Fullstack',
  },
  {
    name: 'ntw',
    title: 'National Training Week – Hormuud University',
    domain: 'ntw.hu.edu.so',
    logo: 'https://ntw.hu.edu.so/favicon-light.png',
    logoFallback: '🎓',
    logoBg: 'from-teal-500 to-teal-700',
    description: 'Intensive online technical training platform for Hormuud University — live sessions, verified certificates, attendance tracking and performance analytics.',
    tech: ['ReactJS', 'NodeJS', 'PostgreSQL', 'Python', 'Charts'],
    live: 'https://ntw.hu.edu.so',
    category: 'Fullstack + Data',
  },
];

const TopLiveProjectCard = ({ project, idx }) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: idx * 0.12 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group"
    >
      {/* Logo Banner */}
      <div className={`w-full h-40 bg-gradient-to-br ${project.logoBg} flex items-center justify-center relative`}>
        {!imgErr ? (
          <img
            src={project.logo}
            alt={project.title}
            onError={() => setImgErr(true)}
            className="w-24 h-24 object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-5xl">{project.logoFallback}</span>
        )}

        {/* Live Status Badge */}
        <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-sm border border-emerald-500/40 rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">Live</span>
        </div>

        {/* Globe icon badge */}
        <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-900 rounded-full p-1.5 shadow">
          <FaGlobe className="w-3.5 h-3.5 text-blue-500" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white capitalize">
            {project.name}
          </h3>
          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-2 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
            {project.category}
          </span>
        </div>

        <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60"
            >
              <HiLightningBolt className="w-3 h-3 text-orange-400" />
              {t.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Direct Link & Live Demo Button */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 truncate max-w-[130px] font-mono"
            title={project.domain}
          >
            {project.domain}
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaExternalLinkAlt className="w-2.5 h-2.5" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Full-Stack Development',
      description: 'Building end-to-end solutions with modern technologies and best practices.',
      color: 'text-blue-600'
    },
    {
      icon: FaRocket,
      title: 'Performance Focused',
      description: 'Optimized applications that deliver exceptional user experiences.',
      color: 'text-green-600'
    },
    {
      icon: FaPalette,
      title: 'Modern Design',
      description: 'Clean, responsive designs that work beautifully across all devices.',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Eng Abdirahman Mohamed Ibrahim
                  </span>
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300"
                >
                  Full-Stack Developer &amp; Data Analyst
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl"
                >
                  I create exceptional digital experiences through clean code, 
                  innovative solutions, and user-centered design. Check out my live production systems below.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  View Top Live Projects
                  <FaArrowRight className="ml-2" />
                </Link>
                
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200"
                >
                  Get In Touch
                </Link>
              </motion.div>

              {/* Quick-Access Top Live Projects Status Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="pt-6 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-600 dark:text-gray-300">
                    Top Live Systems (Online)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TOP_LIVE_PROJECTS.map((proj) => (
                    <a
                      key={proj.name}
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm group"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>{proj.name}</span>
                      <FaExternalLinkAlt className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden group">
                <img
                  src="/profile.jpg"
                  alt="Eng Abdirahman Mohamed Ibrahim"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-900/20 to-transparent"></div>
                
                {/* Floating Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-between shadow-xl">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Full-Stack &amp; Data Analyst</p>
                    <p className="text-base font-bold">Eng Abdirahman Mohamed</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                    4 Live Systems
                  </span>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 left-6 w-14 h-14 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xl shadow-lg"
                >
                  💻
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-lg shadow-lg"
                >
                  🚀
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Top Live Projects Section (Placed Right at the Top!) ── */}
      <section id="live-projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-200 dark:border-emerald-800">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                ACTIVELY RUNNING PRODUCTION SYSTEMS
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Top Live Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                Explore real-world deployed platforms built for healthcare, community, education, and university training.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:underline mt-4 md:mt-0"
            >
              View All in Projects Page <FaArrowRight className="ml-2 text-sm" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_LIVE_PROJECTS.map((project, idx) => (
              <TopLiveProjectCard key={project.name} project={project} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Features Section ("What I Do") ── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I specialize in creating comprehensive digital solutions that combine 
              technical excellence with outstanding user experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg bg-white dark:bg-gray-700 ${feature.color} mb-6`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CTA Section ── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge 
              technology and creative solutions.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Start a Conversation
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
