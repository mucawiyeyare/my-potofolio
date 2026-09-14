import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaEnvelope, FaUser, FaClock, FaTrash, FaEye, FaEyeSlash,
  FaSignOutAlt, FaTachometerAlt, FaGithub, FaExternalLinkAlt,
  FaPlus, FaEdit, FaSave, FaTimes, FaCode, FaProjectDiagram
} from 'react-icons/fa';
import { contactAPI } from '../utils/api';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import AdminAuth from '../components/AdminAuth';
import { useNavigate } from 'react-router-dom';

// ─── Default projects stored in localStorage ────────────────────────────────
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Blood Donation Management System',
    description: 'A full-stack web application connecting blood donors with recipients, managing blood inventory, and coordinating emergency blood requests in real-time.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mucawiyeyare',
    liveUrl: 'https://github.com/mucawiyeyare',
  },
  {
    id: 2,
    title: 'Hotel Management System',
    description: 'A modern web-based hotel reservation and management platform for handling room bookings, guest check-ins/outs, billing, and room availability.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mucawiyeyare',
    liveUrl: 'https://github.com/mucawiyeyare',
  },
  {
    id: 3,
    title: 'School Management System',
    description: 'An all-in-one educational portal for managing student records, attendance, grades, course schedules, and teacher-parent communication.',
    technologies: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mucawiyeyare',
    liveUrl: 'https://github.com/mucawiyeyare',
  },
  {
    id: 4,
    title: 'E-learning Platform',
    description: 'Interactive online learning platform with video courses, quizzes, student progress tracking, and certificate generation.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mucawiyeyare',
    liveUrl: 'https://github.com/mucawiyeyare',
  },
  {
    id: 5,
    title: 'Blog & Content Platform',
    description: 'A modern blogging platform with markdown support, comment system, category filtering, and SEO optimization.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/mucawiyeyare',
    liveUrl: 'https://github.com/mucawiyeyare',
  },
];

const PROJECTS_KEY = 'portfolio_projects';

const getProjects = () => {
  try {
    const stored = localStorage.getItem(PROJECTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
};

const saveProjects = (projects) => {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

// ─── Empty project form ──────────────────────────────────────────────────────
const emptyProject = {
  id: null,
  title: '',
  description: '',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
};

// ────────────────────────────────────────────────────────────────────────────
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab]             = useState('overview');
  const [messages, setMessages]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter]                   = useState('all');
  const [projects, setProjects]               = useState([]);
  const [editingProject, setEditingProject]   = useState(null); // null = no form open
  const [form, setForm]                       = useState(emptyProject);
  const navigate = useNavigate();

  // ── Auth check ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setLoading(false);
    }
    setProjects(getProjects());
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setProjects(getProjects());
    fetchMessages();
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setMessages([]);
    setSelectedMessage(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  // ── Messages ────────────────────────────────────────────────────────────────
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getAll();
      setMessages(response.data.messages || []);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await contactAPI.markAsRead(messageId);
      setMessages(messages.map(msg =>
        msg._id === messageId ? { ...msg, read: true } : msg
      ));
      toast.success('Marked as read');
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactAPI.delete(messageId);
      setMessages(messages.filter(msg => msg._id !== messageId));
      setSelectedMessage(null);
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === 'read')   return m.read;
    if (filter === 'unread') return !m.read;
    return true;
  });

  const formatDate = (ds) => new Date(ds).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  // ── Projects ────────────────────────────────────────────────────────────────
  const openNew = () => {
    setForm({ ...emptyProject, id: Date.now() });
    setEditingProject('new');
  };

  const openEdit = (project) => {
    setForm({
      ...project,
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies,
    });
    setEditingProject(project.id);
  };

  const closeForm = () => {
    setEditingProject(null);
    setForm(emptyProject);
  };

  const saveProject = () => {
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    const techArray = form.technologies
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const updated = { ...form, technologies: techArray };

    let next;
    if (editingProject === 'new') {
      next = [...projects, updated];
    } else {
      next = projects.map(p => p.id === updated.id ? updated : p);
    }
    setProjects(next);
    saveProjects(next);
    toast.success(editingProject === 'new' ? 'Project added!' : 'Project updated!');
    closeForm();
  };

  const deleteProject = (id) => {
    if (!window.confirm('Delete this project?')) return;
    const next = projects.filter(p => p.id !== id);
    setProjects(next);
    saveProjects(next);
    toast.success('Project deleted');
  };

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (!isAuthenticated) return <AdminAuth onAuthenticated={handleAuthenticated} />;
  if (loading)          return <Loading text="Loading dashboard…" />;

  // ── UI ──────────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview',  icon: FaTachometerAlt },
    { id: 'messages', label: 'Messages',  icon: FaEnvelope },
    { id: 'projects', label: 'Projects',  icon: FaProjectDiagram },
  ];

  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      {/* ── Header ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your projects, messages, and portfolio content.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 font-medium"
          >
            <FaSignOutAlt className="w-4 h-4 mr-2" />
            Logout
          </button>
        </motion.div>
      </section>

      {/* ── Tabs ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
              {tab.id === 'messages' && messages.filter(m => !m.read).length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {messages.filter(m => !m.read).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">

          {/* ═══════════════ OVERVIEW ═══════════════ */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: 'Total Messages', value: messages.length,                            color: 'from-blue-500 to-blue-600',   icon: FaEnvelope },
                  { label: 'Unread',          value: messages.filter(m => !m.read).length,       color: 'from-yellow-500 to-orange-500', icon: FaEyeSlash },
                  { label: 'Read',            value: messages.filter(m => m.read).length,        color: 'from-green-500 to-emerald-600', icon: FaEye },
                  { label: 'Projects',        value: projects.length,                            color: 'from-purple-500 to-purple-600', icon: FaCode },
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className={`bg-gradient-to-r ${stat.color} p-4`}>
                      <stat.icon className="w-6 h-6 text-white/80" />
                    </div>
                    <div className="p-5">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaEnvelope className="mr-2 text-blue-500" /> Recent Messages
                  </h2>
                  {messages.slice(0, 4).length === 0 ? (
                    <p className="text-gray-500 text-sm">No messages yet.</p>
                  ) : (
                    <ul className="space-y-3">
                      {messages.slice(0, 4).map(m => (
                        <li
                          key={m._id}
                          onClick={() => { setActiveTab('messages'); setSelectedMessage(m); }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center min-w-0">
                            {!m.read && <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0" />}
                            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</span>
                            <span className="text-xs text-gray-500 ml-2 truncate hidden sm:block">— {m.subject}</span>
                          </div>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatDate(m.createdAt)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaProjectDiagram className="mr-2 text-purple-500" /> Projects Overview
                  </h2>
                  <ul className="space-y-3">
                    {projects.map(p => (
                      <li
                        key={p.id}
                        onClick={() => { setActiveTab('projects'); }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.title}</span>
                        <div className="flex space-x-2 flex-shrink-0 ml-2">
                          {p.githubUrl ? (
                            <a href={p.githubUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                              <FaGithub className="w-4 h-4" />
                            </a>
                          ) : <span className="text-xs text-gray-400">No GitHub</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ MESSAGES ═══════════════ */}
          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Filter bar */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Messages ({filteredMessages.length})
                </h2>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="all">All</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                </select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List */}
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredMessages.length === 0 ? (
                      <div className="p-10 text-center text-gray-400">No messages found.</div>
                    ) : filteredMessages.map(message => (
                      <motion.div
                        key={message._id}
                        whileHover={{ backgroundColor: 'rgba(59,130,246,0.05)' }}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 cursor-pointer transition-colors ${
                          selectedMessage?._id === message._id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        } ${!message.read ? 'border-l-4 border-blue-500' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center min-w-0">
                            <FaUser className="w-3 h-3 text-gray-400 mr-1.5 flex-shrink-0" />
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{message.name}</p>
                            {!message.read && <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 flex-shrink-0" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">{message.subject}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <FaClock className="w-3 h-3 mr-1" />
                          {formatDate(message.createdAt)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-2">
                  {selectedMessage ? (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                    >
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMessage.subject}</h3>
                            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 space-x-2">
                              <FaUser className="w-4 h-4" />
                              <span>{selectedMessage.name}</span>
                              <span>·</span>
                              <span>{selectedMessage.email}</span>
                            </div>
                            <div className="flex items-center mt-1 text-xs text-gray-400">
                              <FaClock className="w-3 h-3 mr-1" />
                              {formatDate(selectedMessage.createdAt)}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {!selectedMessage.read && (
                              <button onClick={() => markAsRead(selectedMessage._id)} title="Mark as read"
                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                                <FaEye className="w-4 h-4" />
                              </button>
                            )}
                            <button onClick={() => deleteMessage(selectedMessage._id)} title="Delete"
                              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedMessage.message}
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <a
                            href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            <FaEnvelope className="w-4 h-4 mr-2" />
                            Reply via Email
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-16 text-center">
                      <FaEnvelope className="w-14 h-14 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Select a message to read it</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════ PROJECTS ═══════════════ */}
          {activeTab === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Projects ({projects.length})
                </h2>
                <motion.button
                  onClick={openNew}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium shadow hover:shadow-lg transition-all duration-200"
                >
                  <FaPlus className="w-4 h-4 mr-2" />
                  Add Project
                </motion.button>
              </div>

              {/* Project Form */}
              <AnimatePresence>
                {editingProject !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-8"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 border-blue-500">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                        {editingProject === 'new' ? '✨ New Project' : '✏️ Edit Project'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { key: 'title',        label: 'Project Title',         placeholder: 'My Awesome Project' },
                          { key: 'description',  label: 'Description',           placeholder: 'A brief description…' },
                          { key: 'technologies', label: 'Technologies (comma-separated)', placeholder: 'React, Node.js, MongoDB' },
                          { key: 'githubUrl',    label: 'GitHub URL',            placeholder: 'https://github.com/you/repo' },
                          { key: 'liveUrl',      label: 'Live URL',              placeholder: 'https://yourproject.com' },
                        ].map(field => (
                          <div key={field.key} className={field.key === 'description' ? 'md:col-span-2' : ''}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              {field.label}
                            </label>
                            {field.key === 'description' ? (
                              <textarea
                                rows={3}
                                value={form[field.key]}
                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                              />
                            ) : (
                              <input
                                type={field.key.includes('Url') ? 'url' : 'text'}
                                value={form[field.key]}
                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                placeholder={field.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-3 mt-5">
                        <button
                          onClick={saveProject}
                          className="flex items-center px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200"
                        >
                          <FaSave className="w-4 h-4 mr-2" />
                          Save
                        </button>
                        <button
                          onClick={closeForm}
                          className="flex items-center px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <FaTimes className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
                      <FaCode className="w-10 h-10 text-white/40" />
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => openEdit(project)}
                          className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors"
                          title="Edit project"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-1.5 bg-red-500/60 hover:bg-red-500/80 text-white rounded-lg transition-colors"
                          title="Delete project"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">{project.description}</p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {(Array.isArray(project.technologies) ? project.technologies : []).map(t => (
                          <span key={t} className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex space-x-2">
                        {project.githubUrl ? (
                          <a href={project.githubUrl} target="_blank" rel="noreferrer"
                            className="flex items-center px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                            <FaGithub className="w-3.5 h-3.5 mr-1.5" /> GitHub
                          </a>
                        ) : (
                          <button onClick={() => openEdit(project)}
                            className="flex items-center px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 rounded-lg text-xs hover:border-blue-400 hover:text-blue-500 transition-colors">
                            <FaGithub className="w-3.5 h-3.5 mr-1.5" /> Add GitHub
                          </button>
                        )}
                        {project.liveUrl ? (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer"
                            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors">
                            <FaExternalLinkAlt className="w-3 h-3 mr-1.5" /> Live
                          </a>
                        ) : (
                          <button onClick={() => openEdit(project)}
                            className="flex items-center px-3 py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-400 rounded-lg text-xs hover:border-blue-400 hover:text-blue-500 transition-colors">
                            <FaExternalLinkAlt className="w-3 h-3 mr-1.5" /> Add Link
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;