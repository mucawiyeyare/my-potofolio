import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaDatabase,
  FaMobile, FaGitAlt, FaCheckCircle, FaTimes, FaLayerGroup
} from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiJavascript, SiPython, SiTailwindcss, SiExpress } from 'react-icons/si';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedDemo, setSelectedDemo] = useState(null);

  const skills = {
    frontend: [
      { name: 'React', icon: SiReact, level: 92, color: 'text-blue-500' },
      { name: 'JavaScript (ES6+)', icon: SiJavascript, level: 95, color: 'text-yellow-500' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: 'text-cyan-500' },
      { name: 'HTML5 / CSS3', icon: FaCode, level: 95, color: 'text-orange-500' }
    ],
    backend: [
      { name: 'Node.js', icon: SiNodedotjs, level: 88, color: 'text-green-500' },
      { name: 'Express.js', icon: SiExpress, level: 88, color: 'text-gray-600' },
      { name: 'Python / PHP', icon: SiPython, level: 80, color: 'text-blue-600' },
      { name: 'RESTful APIs', icon: FaCode, level: 92, color: 'text-purple-500' }
    ],
    database: [
      { name: 'MongoDB', icon: SiMongodb, level: 88, color: 'text-green-600' },
      { name: 'Oracle Database', icon: FaDatabase, level: 78, color: 'text-red-600' },
      { name: 'MySQL', icon: FaDatabase, level: 82, color: 'text-blue-600' }
    ],
    tools: [
      { name: 'Git', icon: FaGitAlt, level: 90, color: 'text-orange-600' },
      { name: 'GitHub', icon: FaGithub, level: 92, color: 'text-gray-800' }
    ]
  };

  const projects = [
    {
      id: 1,
      title: 'Blood Donation Management System',
      tagline: 'Life-saving donor matching & blood inventory platform',
      description: 'A comprehensive full-stack web application designed to connect voluntary blood donors with hospitals and patients. Includes real-time blood group inventory tracking, emergency donor alerts, and donor location search.',
      features: [
        'Real-time blood stock & donor availability tracking',
        'Emergency request broadcast notification system',
        'Secure donor profiles & medical eligibility checks',
        'Hospital & Blood Bank admin management panel'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/mucawiyeyare',
      liveUrl: 'https://github.com/mucawiyeyare',
      featured: true,
      emoji: '🩸',
      gradient: 'from-red-600 via-rose-600 to-pink-700'
    },
    {
      id: 2,
      title: 'Hotel Management System',
      tagline: 'Complete hospitality, room booking & guest portal',
      description: 'A modern web-based hotel reservation and management platform for streamlining hotel operations. Features online room booking, guest check-in/check-out workflow, billing & invoicing, and housekeeping status tracking.',
      features: [
        'Interactive room availability calendar & booking engine',
        'Guest check-in, check-out & digital billing invoices',
        'Staff role-based dashboard for housekeeping & front-desk',
        'Revenue analytics & occupancy statistics'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/mucawiyeyare',
      liveUrl: 'https://github.com/mucawiyeyare',
      featured: true,
      emoji: '🏨',
      gradient: 'from-amber-500 via-orange-600 to-red-600'
    },
    {
      id: 3,
      title: 'School Management System',
      tagline: 'All-in-one academic portal for students, teachers & admins',
      description: 'An integrated educational management system that streamlines school administrative tasks, gradebook processing, student attendance records, exam scheduling, and parent communication.',
      features: [
        'Student profile & academic history management',
        'Automated attendance logging & report card generator',
        'Course scheduling & exam result publishing',
        'Teacher-parent messaging center'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
      githubUrl: 'https://github.com/mucawiyeyare',
      liveUrl: 'https://github.com/mucawiyeyare',
      featured: true,
      emoji: '🏫',
      gradient: 'from-indigo-600 via-blue-600 to-cyan-600'
    },
    {
      id: 4,
      title: 'E-Learning Platform',
      tagline: 'Interactive digital learning environment with video courses',
      description: 'A scalable e-learning portal enabling instructors to publish video courses and students to enroll, track learning progress, take quizzes, and earn course certificates.',
      features: [
        'HD Video streaming & lesson progress bar',
        'Quiz assessment engine with instant scoring',
        'Automated PDF certificate generation upon completion',
        'Course discussion forum & student Q&A'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      githubUrl: 'https://github.com/mucawiyeyare',
      liveUrl: 'https://github.com/mucawiyeyare',
      featured: false,
      emoji: '🎓',
      gradient: 'from-blue-600 via-teal-600 to-emerald-600'
    },
    {
      id: 5,
      title: 'Blog & Content Platform',
      tagline: 'Modern publishing engine for articles & developer tutorials',
      description: 'A feature-rich blogging and content management platform built for fast publishing, markdown formatting, comment moderation, tag filtering, and SEO optimization.',
      features: [
        'Rich Markdown editor with syntax highlighting',
        'Comment system with reader interaction',
        'Category & Tag-based article organization',
        'SEO meta tag auto-generation'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      githubUrl: 'https://github.com/mucawiyeyare',
      liveUrl: 'https://github.com/mucawiyeyare',
      featured: false,
      emoji: '✍️',
      gradient: 'from-purple-600 via-violet-600 to-indigo-700'
    }
  ];

  const tabs = [
    { id: 'projects', label: 'Projects & Portfolio', icon: FaLayerGroup },
    { id: 'skills', label: 'Technical Skills', icon: FaCode }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Top Banner for GitHub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-md text-3xl">
              <FaGithub />
            </div>
            <div>
              <h2 className="text-xl font-bold">Explore My GitHub Repositories</h2>
              <p className="text-sm text-gray-300">View source code, commits, and open-source contributions by Eng Abdirahman</p>
            </div>
          </div>
          <a
            href="https://github.com/mucawiyeyare"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-md hover:scale-105 shrink-0"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            Visit github.com/mucawiyeyare
            <FaExternalLinkAlt className="w-3.5 h-3.5 ml-2 text-gray-500" />
          </a>
        </div>
      </section>

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Portfolio & Work
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover full-stack web applications, management systems, and technical capabilities built by Eng Abdirahman Mohamed Ibrahim.
          </p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl shadow-inner flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {activeTab === 'projects' && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-between border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 ${
                  project.featured ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                }`}
              >
                <div>
                  {/* Card Header Background */}
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center p-6`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    <div className="relative text-center text-white z-10">
                      <div className="text-5xl mb-2 drop-shadow-md">{project.emoji}</div>
                      <p className="text-xs uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full inline-block border border-white/30">
                        {project.technologies[0]} • {project.technologies[1]}
                      </p>
                    </div>

                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center">
                        ★ Featured
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                      {project.tagline}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 mb-6">
                      {project.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start text-xs text-gray-600 dark:text-gray-400">
                          <FaCheckCircle className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-md border border-blue-200/50 dark:border-blue-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 flex items-center space-x-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md"
                  >
                    <FaGithub className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  <button
                    onClick={() => setSelectedDemo(project)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md hover:scale-[1.02]"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5 mr-2" />
                    Live Demo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills Section */}
      {activeTab === 'skills' && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 capitalize flex items-center">
                  {category === 'frontend' && <FaCode className="mr-3 text-blue-500" />}
                  {category === 'backend' && <FaServer className="mr-3 text-green-500" />}
                  {category === 'database' && <FaDatabase className="mr-3 text-purple-500" />}
                  {category === 'tools' && <FaMobile className="mr-3 text-orange-500" />}
                  {category} Development
                </h3>
                <div className="space-y-6">
                  {skillList.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <skill.icon className={`w-5 h-5 mr-3 ${skill.color}`} />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Live Demo Modal */}
      <AnimatePresence>
        {selectedDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 relative"
            >
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r ${selectedDemo.gradient} text-white relative`}>
                <button
                  onClick={() => setSelectedDemo(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
                <div className="text-4xl mb-2">{selectedDemo.emoji}</div>
                <h3 className="text-2xl font-bold">{selectedDemo.title}</h3>
                <p className="text-sm opacity-90">{selectedDemo.tagline}</p>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-2">Project Overview</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    {selectedDemo.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-3">Key System Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedDemo.features.map((feat, i) => (
                      <div key={i} className="flex items-center text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-600">
                        <FaCheckCircle className="text-emerald-500 mr-2.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider mb-2">Built With</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDemo.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Buttons */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 justify-end">
                  <a
                    href={selectedDemo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl transition-all shadow-md"
                  >
                    <FaGithub className="w-4 h-4 mr-2" />
                    View Source Code on GitHub
                  </a>
                  <a
                    href={selectedDemo.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:scale-105"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5 mr-2" />
                    Open Live Repository / Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bio Section */}
      <section className="mt-20 bg-gray-50 dark:bg-gray-800/60 py-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Professional Summary
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                I'm <strong>Eng Abdirahman Mohamed Ibrahim</strong>, a full-stack software developer, <strong>Web Development Teacher & Administrator at Iftiinhub College</strong> for the past year, and <strong>Class Student Assistant</strong> at <strong>Hormuud University</strong> (Faculty of Computer Science).
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                As a Web Developer Admin and Instructor, I lead web development programs and mentor upcoming developers while maintaining a top academic record (Grade A) at Hormuud University. I specialize in engineering full-stack platforms like <strong>Blood Donation Management Systems</strong>, <strong>Hotel Management Systems</strong>, <strong>School Portals</strong>, and <strong>E-Learning Platforms</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Profile;