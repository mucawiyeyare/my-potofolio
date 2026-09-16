import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactAPI } from '../utils/api';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';
import AdminAuth from '../components/AdminAuth';
import { useNavigate } from 'react-router-dom';
import { getStoredProjects, saveStoredProjects } from '../utils/projectsData';
import { getStoredCredentials, saveCredentials, validateLogin } from '../utils/adminAuth';

// ─── Empty project form ──────────────────────────────────────────────────────
const emptyProject = {
  id: '',
  name: '',
  title: '',
  domain: '',
  category: 'Fullstack',
  description: '',
  technologies: '',
  liveUrl: '',
  githubUrl: '',
  logo: '',
  featured: true,
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
  const [accountForm, setAccountForm]         = useState({ currentPassword: '', username: '', newPassword: '', confirmPassword: '' });
  const navigate = useNavigate();

  // ── Auth & Data Loading ───────────────────────────────────────────────────
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      setLoading(false);
    }
    setProjects(getStoredProjects());
    setAccountForm(f => ({ ...f, username: getStoredCredentials().username }));

    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };
    window.addEventListener('portfolio_projects_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('portfolio_projects_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setProjects(getStoredProjects());
    setAccountForm(f => ({ ...f, username: getStoredCredentials().username }));
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
    setForm({
      ...emptyProject,
      id: 'proj_' + Date.now(),
    });
    setEditingProject('new');
  };

  const openEdit = (project) => {
    const rawTech = project.technologies || project.tech || [];
    const techStr = Array.isArray(rawTech) ? rawTech.join(', ') : String(rawTech || '');
    setForm({
      id: project.id,
      name: project.name || project.title || '',
      title: project.title || project.name || '',
      domain: project.domain || '',
      category: project.category || 'Fullstack',
      description: project.description || '',
      technologies: techStr,
      liveUrl: project.liveUrl || project.live || '',
      githubUrl: project.githubUrl || project.github || '',
      logo: project.logo || project.imageUrl || '',
      featured: project.featured !== false,
    });
    setEditingProject(project.id);
  };

  const closeForm = () => {
    setEditingProject(null);
    setForm(emptyProject);
  };

  const saveProject = () => {
    if (!form.title.trim() && !form.name.trim()) {
      toast.error('Project title or name is required');
      return;
    }
    const title = form.title.trim() || form.name.trim();
    const name = form.name.trim() || title;
    const techArray = form.technologies
      ? form.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    const live = form.liveUrl.trim();
    const github = form.githubUrl.trim();
    const domain = form.domain.trim() || (live ? live.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : '');

    const updated = {
      ...form,
      id: form.id || ('proj_' + Date.now()),
      title,
      name,
      domain,
      category: form.category || 'Fullstack',
      description: form.description.trim(),
      technologies: techArray,
      tech: techArray,
      liveUrl: live,
      live: live,
      githubUrl: github,
      github: github,
      logo: form.logo.trim(),
      featured: true,
    };

    let next;
    if (editingProject === 'new') {
      next = [updated, ...projects];
    } else {
      next = projects.map(p => p.id === updated.id ? updated : p);
    }
    setProjects(next);
    saveStoredProjects(next);
    toast.success(editingProject === 'new' ? 'Project created and published to Home & Projects!' : 'Project updated and published!');
    closeForm();
  };

  const deleteProject = (id) => {
    if (!window.confirm('Delete this project? It will also be removed from the Home and Projects pages.')) return;
    const next = projects.filter(p => p.id !== id);
    setProjects(next);
    saveStoredProjects(next);
    toast.success('Project deleted');
  };

  // ── Account ─────────────────────────────────────────────────────────────────
  const updateAccount = (e) => {
    e.preventDefault();
    const { currentPassword, username, newPassword, confirmPassword } = accountForm;

    if (!validateLogin(getStoredCredentials().username, currentPassword)) {
      toast.error('Current password is incorrect');
      return;
    }
    if (!username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }

    const nextCreds = {
      username: username.trim(),
      password: newPassword ? newPassword : getStoredCredentials().password,
    };
    saveCredentials(nextCreds);
    localStorage.setItem('adminUser', nextCreds.username);
    setAccountForm({ currentPassword: '', username: nextCreds.username, newPassword: '', confirmPassword: '' });
    toast.success('Account credentials updated');
  };

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (!isAuthenticated) return <AdminAuth onAuthenticated={handleAuthenticated} />;
  if (loading)          return <Loading text="Loading dashboard…" />;

  // ── UI ──────────────────────────────────────────────────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'messages', label: 'Messages' },
    { id: 'projects', label: 'Projects' },
    { id: 'account', label: 'Account' },
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
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 font-medium"
          >
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
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
              {tab.id === 'messages' && messages.filter(m => !m.read).length > 0 && (
                <span className={`ml-2 text-xs rounded-full px-1.5 py-0.5 ${
                  activeTab === tab.id ? 'bg-white/20 text-white dark:bg-gray-900/20 dark:text-gray-900' : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                }`}>
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
                  { label: 'Total Messages', value: messages.length },
                  { label: 'Unread',          value: messages.filter(m => !m.read).length },
                  { label: 'Read',            value: messages.filter(m => m.read).length },
                  { label: 'Projects',        value: projects.length },
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="bg-gray-900 dark:bg-gray-950 p-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-white/70">{stat.label}</span>
                    </div>
                    <div className="p-5">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Recent Messages
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
                            {!m.read && <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mr-2 flex-shrink-0" />}
                            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{m.name}</span>
                            <span className="text-xs text-gray-500 ml-2 truncate hidden sm:block">— {m.subject}</span>
                          </div>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{formatDate(m.createdAt)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Projects Overview
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
                            <a href={p.githubUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                              GitHub
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
                <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredMessages.length === 0 ? (
                      <div className="p-10 text-center text-gray-400">No messages found.</div>
                    ) : filteredMessages.map(message => (
                      <div
                        key={message._id}
                        onClick={() => setSelectedMessage(message)}
                        className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          selectedMessage?._id === message._id ? 'bg-gray-100 dark:bg-gray-700' : ''
                        } ${!message.read ? 'border-l-4 border-gray-900 dark:border-white' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{message.name}</p>
                            {!message.read && <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full ml-2 flex-shrink-0" />}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 truncate">{message.subject}</p>
                        <div className="text-xs text-gray-400">
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detail */}
                <div className="lg:col-span-2">
                  {selectedMessage ? (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMessage.subject}</h3>
                            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400 space-x-2">
                              <span>{selectedMessage.name}</span>
                              <span>·</span>
                              <span>{selectedMessage.email}</span>
                            </div>
                            <div className="mt-1 text-xs text-gray-400">
                              {formatDate(selectedMessage.createdAt)}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {!selectedMessage.read && (
                              <button onClick={() => markAsRead(selectedMessage._id)} title="Mark as read"
                                className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                                Mark Read
                              </button>
                            )}
                            <button onClick={() => deleteMessage(selectedMessage._id)} title="Delete"
                              className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                              Delete
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
                            className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            Reply via Email
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-16 text-center">
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
                  className="flex items-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium shadow hover:bg-black dark:hover:bg-gray-200 transition-all duration-200"
                >
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
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-gray-900 dark:border-white">
                      <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-gray-700">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {editingProject === 'new' ? 'Add New Portfolio Project / System' : 'Edit Project / System'}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Changes saved here immediately update the Home and Projects pages.
                          </p>
                        </div>
                        <button
                          onClick={closeForm}
                          className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 rounded-lg"
                        >
                          Close
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Title */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Full Project Title *
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="e.g. SNAB Dental & Dermatologic Clinic"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                            required
                          />
                        </div>

                        {/* Short Name / Identifier */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            System Short Name / Identifier
                          </label>
                          <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. snabdental or Blood Bank"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Category */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Category
                          </label>
                          <select
                            value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          >
                            <option value="Fullstack">Fullstack</option>
                            <option value="Fullstack + Data">Fullstack + Data</option>
                            <option value="Data Analyst">Data Analyst</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Mobile App">Mobile App</option>
                          </select>
                        </div>

                        {/* Domain */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Subdomain / Domain
                          </label>
                          <input
                            type="text"
                            value={form.domain}
                            onChange={e => setForm({ ...form, domain: e.target.value })}
                            placeholder="e.g. snabdental.iftiinhub.com"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Live URL */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Live URL
                          </label>
                          <input
                            type="url"
                            value={form.liveUrl}
                            onChange={e => setForm({ ...form, liveUrl: e.target.value })}
                            placeholder="https://snabdental.iftiinhub.com"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* GitHub URL */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            GitHub URL
                          </label>
                          <input
                            type="url"
                            value={form.githubUrl}
                            onChange={e => setForm({ ...form, githubUrl: e.target.value })}
                            placeholder="https://github.com/mucawiyeyare/..."
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Logo Image URL */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Logo Image URL
                          </label>
                          <input
                            type="text"
                            value={form.logo}
                            onChange={e => setForm({ ...form, logo: e.target.value })}
                            placeholder="https://snabdental.iftiinhub.com/logo.png"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Technologies */}
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Technologies (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={form.technologies}
                            onChange={e => setForm({ ...form, technologies: e.target.value })}
                            placeholder="ReactJS, NodeJS, MongoDB, Tailwind, Express"
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                          />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })}
                            placeholder="A concise summary of what this platform accomplishes..."
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                        <button
                          onClick={saveProject}
                          className="flex items-center px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow hover:bg-black dark:hover:bg-gray-200 transition-all duration-200"
                        >
                          {editingProject === 'new' ? 'Create & Publish Project' : 'Save & Publish Changes'}
                        </button>
                        <button
                          onClick={closeForm}
                          className="flex items-center px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.map((project, idx) => {
                  const title = project.title || project.name || 'Untitled Project';
                  const name = project.name || project.title || 'Project';
                  const live = project.liveUrl || project.live || '';
                  const domain = project.domain || (live ? live.replace(/^https?:\/\//, '').replace(/\/.*$/, '') : '');
                  const rawTech = project.technologies || project.tech || [];
                  const techList = Array.isArray(rawTech) ? rawTech : String(rawTech).split(',').map(s => s.trim()).filter(Boolean);
                  const logo = project.logo || project.imageUrl || '';
                  const initials = name.slice(0, 2).toUpperCase();

                  return (
                    <motion.div
                      key={project.id || idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      {/* Banner */}
                      <div className="h-36 bg-white border-b border-gray-100 dark:border-gray-700 relative flex items-center justify-center">
                        {logo ? (
                          <img
                            src={logo}
                            alt={title}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            className="h-20 w-20 object-contain drop-shadow-lg"
                          />
                        ) : (
                          <span className="text-3xl font-bold text-gray-900 tracking-wide">{initials}</span>
                        )}

                        {/* Category badge */}
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[11px] text-white font-semibold">
                          {project.category || 'Fullstack'}
                        </div>

                        {/* Live status badge */}
                        <div className="absolute bottom-3 right-3 bg-black/50 border border-white/30 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-white font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                          Live
                        </div>

                        {/* Action buttons */}
                        <div className="absolute top-3 right-3 flex space-x-1.5">
                          <button
                            onClick={() => openEdit(project)}
                            className="px-2.5 py-1 bg-black/40 hover:bg-black/70 text-white text-xs font-semibold rounded-lg transition-colors backdrop-blur-sm shadow"
                            title="Edit project"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="px-2.5 py-1 bg-black/40 hover:bg-black/70 text-white text-xs font-semibold rounded-lg transition-colors backdrop-blur-sm shadow"
                            title="Delete project"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1 truncate" title={title}>
                          {title}
                        </h3>

                        {domain && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-mono mb-2 truncate">
                            {domain}
                          </div>
                        )}

                        <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {techList.slice(0, 5).map(t => (
                            <span key={t} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[11px] font-medium rounded-full border border-gray-200 dark:border-gray-600">
                              {t}
                            </span>
                          ))}
                          {techList.length > 5 && (
                            <span className="px-1.5 py-0.5 text-gray-400 text-[11px]">
                              +{techList.length - 5}
                            </span>
                          )}
                        </div>

                        {/* Links & Edit */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex space-x-2">
                            {live && (
                              <a
                                href={live}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-3 py-1.5 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg text-xs font-bold transition-colors"
                              >
                                Live
                              </a>
                            )}
                            {(project.githubUrl || project.github) && (
                              <a
                                href={project.githubUrl || project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                Code
                              </a>
                            )}
                          </div>

                          <button
                            onClick={() => openEdit(project)}
                            className="text-xs text-gray-700 dark:text-gray-300 font-bold hover:underline"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ═══════════════ ACCOUNT ═══════════════ */}
          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Account Settings
              </h2>

              <form onSubmit={updateAccount} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Change the username and password used to sign in to this dashboard.
                </p>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    value={accountForm.currentPassword}
                    onChange={e => setAccountForm({ ...accountForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                    placeholder="Enter your current password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Username *
                  </label>
                  <input
                    type="text"
                    value={accountForm.username}
                    onChange={e => setAccountForm({ ...accountForm, username: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={accountForm.newPassword}
                    onChange={e => setAccountForm({ ...accountForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={accountForm.confirmPassword}
                    onChange={e => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent text-sm"
                    placeholder="Repeat new password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-bold shadow hover:bg-black dark:hover:bg-gray-200 transition-all duration-200"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
