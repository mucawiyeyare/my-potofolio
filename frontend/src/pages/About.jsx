import React from 'react';
import { motion } from 'framer-motion';

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
      title: 'Passion-Driven',
      description: 'I love what I do and it shows in every project I work on.'
    },
    {
      title: 'Quality First',
      description: 'Committed to delivering high-quality, maintainable code.'
    },
    {
      title: 'Professional',
      description: 'Reliable, communicative, and deadline-focused approach.'
    }
  ];

  return (
    <div className="min-h-screen py-10 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              About Me
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm <strong>Eng Abdirahman Mohamed Ibrahim</strong>, a dedicated full-stack developer and data analyst,
              <strong> Web Development Teacher & Administrator at Iftiinhub College</strong> for the past year,
              and an active <strong>Student Assistant</strong> for my class at <strong>Hormuud University</strong> (Faculty of Computer Science).
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I combine hands-on software development with teaching and academic mentorship—empowering students in web development while engineering robust full-stack applications using React, Node.js, Express, and MongoDB, and turning complex data into clear, actionable insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:max-w-none mt-4 lg:mt-0"
          >
            <div className="relative w-full h-80 sm:h-96 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 group">
              <img
                src="/profile.jpg"
                alt="Eng Abdirahman Mohamed Ibrahim"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold truncate">Eng Abdirahman Mohamed</span>
                <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/30 text-white flex-shrink-0">Developer & Teacher</span>
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
                className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 text-center"
              >
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
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              My Journey
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
              A timeline of my professional and educational milestones.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            <div className="space-y-8 sm:space-y-12">
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
                  <div className="absolute left-2.5 sm:left-6.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-white dark:border-gray-900 bg-gray-900 dark:bg-white"></div>

                  {/* Content */}
                  <div className="ml-8 sm:ml-16 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-gray-200 dark:border-gray-700 flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full">
                        {item.year}
                      </span>
                      <span className="ml-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {item.type === 'work' ? 'Work' : 'Education'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium mb-2 sm:mb-3">
                      {item.company}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
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
      <section className="bg-gray-900 dark:bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white dark:text-gray-900"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">
              Fun Facts About Me
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">10+</div>
                <div className="text-xs sm:text-base text-gray-300 dark:text-gray-600">Projects Completed</div>
              </div>
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">1+</div>
                <div className="text-xs sm:text-base text-gray-300 dark:text-gray-600">Years Experience</div>
              </div>
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">∞</div>
                <div className="text-xs sm:text-base text-gray-300 dark:text-gray-600">Cups of Coffee</div>
              </div>
              <div className="p-3 sm:p-0">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">24/7</div>
                <div className="text-xs sm:text-base text-gray-300 dark:text-gray-600">Learning Mode</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
