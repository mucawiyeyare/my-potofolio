import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStoredProjects } from "../utils/projectsData";

/* ─── SKILLS ─────────────────────────────────────────── */
const skillCategories = [
  {
    role: "Fullstack Developer",
    skills: [
      "React", "Node.js", "JavaScript", "HTML5", "CSS3",
      "Tailwind CSS", "MongoDB", "Express.js", "MySQL",
    ],
  },
  {
    role: "Data Analyst",
    skills: [
      "Python", "SQL / PostgreSQL", "Data Visualization",
      "MongoDB Analytics", "Dashboard Design",
    ],
  },
];

/* ─── CARD ────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const ProjectCard = ({ project, index }) => {
  const [imgError, setImgError] = useState(false);

  const title = project.title || project.name || "Untitled Project";
  const name = project.name || project.title || "Project";
  const live = project.live || project.liveUrl || "#";
  const domain = project.domain || (live !== "#" ? live.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : "");
  const logo = project.logo || project.imageUrl || "";
  const category = project.category || "Fullstack";
  const rawTech = project.tech || project.technologies || [];
  const techList = Array.isArray(rawTech) ? rawTech : String(rawTech).split(",").map(s => s.trim()).filter(Boolean);
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700 group"
    >
      {/* Logo banner */}
      <div className="w-full h-36 sm:h-44 bg-gray-900 dark:bg-gray-950 flex items-center justify-center relative">
        {!imgError && logo ? (
          <img
            src={logo}
            alt={title}
            onError={() => setImgError(true)}
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-4xl sm:text-5xl font-bold text-white tracking-wide">{initials}</span>
        )}

        {/* Live Status Badge */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-black/70 backdrop-blur-sm border border-white/30 rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 flex items-center gap-1.5 shadow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-white uppercase">Live</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize">
            {name}
          </h2>
          <span className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-gray-200 dark:border-gray-600">
            {category}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-3 sm:mb-4">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
          {techList.map((t) => (
            <span
              key={t}
              className="px-2.5 sm:px-3 py-1 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60"
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Domain and Live Demo Button */}
        <div className="pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2 sm:gap-3">
          {domain ? (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white truncate max-w-[130px] sm:max-w-[200px]"
              title={domain}
            >
              {domain}
            </a>
          ) : (
            <span className="text-xs text-gray-400 font-mono">Production App</span>
          )}
          {live && live !== "#" ? (
            <a
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex-shrink-0"
            >
              Live Demo
            </a>
          ) : (
            <span className="text-xs text-gray-400">Published</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* ─── PAGE ────────────────────────────────────────────── */
const Projects = () => {
  const [projectsList, setProjectsList] = useState(getStoredProjects());

  useEffect(() => {
    const handleUpdate = () => setProjectsList(getStoredProjects());
    window.addEventListener("portfolio_projects_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio_projects_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* ── Header ── */}
      <section className="py-10 sm:py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold mb-3 sm:mb-4 border border-gray-200 dark:border-gray-700">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-900 dark:bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gray-900 dark:bg-white"></span>
            </span>
            ACTIVELY DEPLOYED SYSTEMS
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Top Live Projects
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Real-world fullstack systems and analytics platforms I designed, engineered, and launched live online.
          </p>
        </motion.div>
      </section>

      {/* ── Top Live Project Cards ── */}
      <section className="px-4 pb-12 sm:pb-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Published Systems ({projectsList.length})
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 w-fit">
            {projectsList.length} Production Apps Online
          </span>
        </motion.div>

        <div className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 mb-14 sm:mb-20">
          {projectsList.map((project, i) => (
            <ProjectCard key={project.id || project.name || i} project={project} index={i} />
          ))}
        </div>

        {/* ── Skills & Expertise ── */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-center"
        >
          Skills &amp; Expertise
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-md"
            >
              <div className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm sm:text-base mb-4 sm:mb-5 shadow-sm">
                {cat.role}
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {s}
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
