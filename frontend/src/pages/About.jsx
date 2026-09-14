import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  const timeline = [
    {
      year: '2025 - Present',
      type: 'work',
      title: 'Teacher & Web Developer Administrator',
      company: 'Iftiinhub College',
      description: 'Serving as Web Development Instructor and Web Developer Administrator for the past year. Teaching modern web development (React, Node.js, JS, HTML/CSS), managing web development curriculum, and building digital solutions.',
    },
    {
      year: 'Present',
      type: 'education',
      title: 'Student Assistant & Computer Science Student',
      company: 'Hormuud University',
      description: 'Faculty of Computer Science student maintaining Grade A performance. Serving as Student Assistant for my class, assisting classmates with practical coding assignments, supporting faculty professors, and leading technical study groups.',
    },
    {
      year: '2025',
      type: 'work',
      title: 'Junior Full-Stack Developer',
      company: 'Kordhoso Aqoon',
      description: 'Contributed to building scalable web applications with React, Node.js, JavaScript, Tailwind CSS, and cloud technologies.',
    },
    {
      year: '2025',
      type: 'work',
      title: 'Full-Stack Developer',
      company: 'Kafiye Technology Center',
      description: 'Built and maintained client web projects, focused on performance optimization and user experience.',
    }
  ];

  const values = [
    {
      icon: FaHeart,
      title: 'Passion-Driven',
      description: 'I love what I do and it shows in every project I work on.'
    },
    {
      icon: FaAward,
      title: 'Quality First',
      description: 'Committed to delivering high-quality, maintainable code.'
    },
    {
      icon: FaBriefcase,
      title: 'Professional',
      description: 'Reliable, communicative, and deadline-focused approach.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm <strong>Eng Abdirahman Mohamed Ibrahim</strong>, a dedicated full-stack developer, 
              <strong> Web Development Teacher & Administrator at Iftiinhub College</strong> for the past year, 
              and an active <strong>Student Assistant</strong> for my class at <strong>Hormuud University</strong> (Faculty of Computer Science).
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I combine hands-on software development with teaching and academic mentorship—empowering students in web development while engineering robust full-stack applications using React, Node.js, Express, and MongoDB.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 rounded-2xl shadow-2xl overflow-hidden group">
              <img
                src="/profile.jpg"
                alt="Eng Abdirahman Mohamed Ibrahim"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-between">
                <span className="text-sm font-semibold">Eng Abdirahman Mohamed</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200">Top Student & Developer</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core principles guide my work and interactions with clients and colleagues.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              My Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              A timeline of my professional and educational milestones.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 ${
                    item.type === 'work' 
                      ? 'bg-blue-600' 
                      : 'bg-green-600'
                  }`}></div>

                  {/* Content */}
                  <div className="ml-16 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                        {item.year}
                      </span>
                      <div className="ml-3">
                        {item.type === 'work' ? (
                          <FaBriefcase className="text-blue-600 dark:text-blue-400" />
                        ) : (
                          <FaGraduationCap className="text-green-600 dark:text-green-400" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                      {item.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Fun Facts About Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">10+</div>
                <div className="text-blue-100">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-blue-100">Cups of Coffee</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Learning Mode</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;