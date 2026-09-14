import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaGlobe, FaCode, FaDatabase, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaChartBar, FaPython } from "react-icons/fa";
import { SiMongodb, SiJavascript, SiTailwindcss, SiExpress, SiMysql, SiPostgresql } from "react-icons/si";
import { HiLightningBolt } from "react-icons/hi";

/* ─── SKILLS ─────────────────────────────────────────── */
const skillCategories = [
  {
    role: "Fullstack Developer",
    icon: <FaCode className="w-7 h-7" />,
    color: "from-blue-500 to-purple-600",
    skills: [
      { name: "React", icon: <FaReact className="w-5 h-5 text-cyan-400" /> },
      { name: "Node.js", icon: <FaNodeJs className="w-5 h-5 text-green-500" /> },
      { name: "JavaScript", icon: <SiJavascript className="w-5 h-5 text-yellow-400" /> },
      { name: "HTML5", icon: <FaHtml5 className="w-5 h-5 text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3Alt className="w-5 h-5 text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5 text-teal-400" /> },
      { name: "MongoDB", icon: <SiMongodb className="w-5 h-5 text-green-600" /> },
      { name: "Express.js", icon: <SiExpress className="w-5 h-5 text-gray-400" /> },
      { name: "MySQL", icon: <SiMysql className="w-5 h-5 text-blue-500" /> },
    ],
  },
  {
    role: "Data Analyst",
    icon: <FaChartBar className="w-7 h-7" />,
    color: "from-emerald-500 to-teal-600",
    skills: [
      { name: "Python", icon: <FaPython className="w-5 h-5 text-yellow-300" /> },
      { name: "SQL / PostgreSQL", icon: <SiPostgresql className="w-5 h-5 text-blue-400" /> },
      { name: "Data Visualization", icon: <FaChartBar className="w-5 h-5 text-purple-400" /> },
      { name: "MongoDB Analytics", icon: <SiMongodb className="w-5 h-5 text-green-600" /> },
      { name: "Dashboard Design", icon: <FaDatabase className="w-5 h-5 text-rose-400" /> },
    ],
  },
];

/* ─── PROJECTS ────────────────────────────────────────── */
const projects = [
  {
    name: "snabdental",
    title: "SNAB Dental & Dermatologic Clinic",
    domain: "snabdental.iftiinhub.com",
    logo: "https://snabdental.iftiinhub.com/logo.png",
    logoFallback: "🦷",
    logoBg: "from-blue-600 to-blue-800",
    description:
      "A modern and powerful dental management system designed to help dental clinics securely store, manage, and organize patient data. It provides an efficient way for dentists and clinic staff to access patient records, treatment histories, appointments, and other important information in one centralized system.",
    tech: ["HTML", "CSS", "JS", "ReactJS", "NodeJS", "MongoDB"],
    live: "https://snabdental.iftiinhub.com",
    category: "Fullstack",
  },
  {
    name: "dhiigkaal",
    title: "DHIIG KAAL – Blood Donation System",
    domain: "dhiigkaal.iftiinhub.com",
    logo: "https://dhiigkaal.iftiinhub.com/logo.jpg",
    logoFallback: "🩸",
    logoBg: "from-red-500 to-red-700",
    description:
      "A comprehensive blood donation management system that connects donors with patients in need. It enables clinics and blood banks to track donations, manage donor records, blood inventory, and coordinate life-saving transfusions efficiently.",
    tech: ["ReactJS", "NodeJS", "MongoDB", "Tailwind CSS", "Express"],
    live: "https://dhiigkaal.iftiinhub.com",
    category: "Fullstack",
  },
  {
    name: "iftiinhub",
    title: "IftiinHub – Online Learning Platform",
    domain: "iftiinhub.com",
    logo: "https://iftiinhub.com/logo-transparent.png",
    logoFallback: "📚",
    logoBg: "from-indigo-500 to-indigo-700",
    description:
      "A full-featured e-learning platform that provides students and professionals with access to quality online courses, interactive lessons, and progress tracking. IftiinHub empowers learners to grow their skills at their own pace with a clean and intuitive interface.",
    tech: ["ReactJS", "NodeJS", "MongoDB", "Tailwind CSS", "Express"],
    live: "https://iftiinhub.com",
    category: "Fullstack",
  },
  {
    name: "ntw",
    title: "National Training Week – Hormuud University",
    domain: "ntw.hu.edu.so",
    logo: "https://ntw.hu.edu.so/favicon-light.png",
    logoFallback: "🎓",
    logoBg: "from-teal-500 to-teal-700",
    description:
      "Intensive online technical training platform for Hormuud University — live sessions, verified certificates, attendance tracking and performance analytics.",
    tech: ["ReactJS", "NodeJS", "PostgreSQL", "Tailwind CSS", "Python", "Charts"],
    live: "https://ntw.hu.edu.so",
    category: "Fullstack + Data",
  },
];

/* ─── CARD ────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const ProjectCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700 group"
    >
      {/* Logo banner */}
      <div className={`w-full h-44 bg-gradient-to-br ${project.logoBg} flex items-center justify-center relative`}>
        {!imgError ? (
          <img
            src={project.logo}
            alt={project.title}
            onError={() => setImgError(true)}
            className="w-28 h-28 object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-6xl">{project.logoFallback}</span>
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
          <FaGlobe className="w-4 h-4 text-blue-500" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
            {project.name}
          </h2>
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-2.5 py-1 rounded-full border border-purple-200 dark:border-purple-800">
            {project.category}
          </span>
        </div>

        <p className="text-sm text-blue-600 dark:text-blue-400 leading-relaxed flex-1 mb-4">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1 px-3 py-1 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60"
            >
              <HiLightningBolt className="w-3 h-3 text-orange-400" />
              {t.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Domain and Live Demo Button */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 truncate"
            title={project.domain}
          >
            {project.domain}
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── PAGE ────────────────────────────────────────────── */
const Projects = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ── Header ── */}
      <section className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-4 border border-emerald-200 dark:border-emerald-800">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            ACTIVELY DEPLOYED SYSTEMS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Top{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Live Projects
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-world fullstack systems and analytics platforms I designed, engineered, and launched live online.
          </p>
        </motion.div>
      </section>

      {/* ── Top Live Project Cards ── */}
      <section className="px-4 pb-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🚀</span> Top Live Systems
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
            4 Production Apps Online
          </span>
        </motion.div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mb-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* ── Skills & Expertise ── */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
        >
          🛠️ Skills &amp; Expertise
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-md"
            >
              <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${cat.color} text-white font-bold text-base mb-5 shadow-sm`}>
                {cat.icon}
                {cat.role}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {s.icon}
                    {s.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
