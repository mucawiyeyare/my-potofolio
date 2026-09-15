import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { contactAPI } from '../utils/api';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const contactInfo = [
    {
      title: 'Email',
      value: 'abdirahm916@gmail.com',
      secondaryValue: 'Abdirah916@gmail.com',
      link: 'mailto:abdirahm916@gmail.com'
    },
    {
      title: 'Phone',
      value: '+252 616408886',
      link: 'tel:+252616408886'
    },
    {
      title: 'Location',
      value: 'Mogadishu, Somalia',
      link: null
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/mucawiyeyare' },
    { name: 'GitHub', url: 'https://github.com/mucawiyeyare' },
    { name: 'Twitter', url: 'https://twitter.com/mucawiyeyare' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await contactAPI.submit(data);

      if (response.data.success) {
        toast.success(response.data.message);
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      if (error.response?.data?.errors?.length) {
        error.response.data.errors.forEach(err => {
          toast.error(err.msg);
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.code === 'ECONNABORTED') {
        toast.error('Request timed out. Please try again.');
      } else {
        toast.error('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 sm:py-16 lg:py-20">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Get In Touch
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to chat? I'd love to hear from you.
            Send me a message and I'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
              Send Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    maxLength: { value: 100, message: 'Name cannot exceed 100 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors duration-200 ${
                    errors.name
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Please enter a valid email address'
                    }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors duration-200 ${
                    errors.email
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{errors.email.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', {
                    required: 'Subject is required',
                    minLength: { value: 2, message: 'Subject must be at least 2 characters' },
                    maxLength: { value: 200, message: 'Subject cannot exceed 200 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors duration-200 ${
                    errors.subject
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 2, message: 'Message must be at least 2 characters' },
                    maxLength: { value: 1000, message: 'Message cannot exceed 1000 characters' }
                  })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors duration-200 resize-none ${
                    errors.message
                      ? 'border-gray-900 dark:border-white'
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="Tell me about your project or just say hello..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white dark:border-gray-900 mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
                Contact Information
              </h2>
              <div className="space-y-5 sm:space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xs font-bold uppercase text-gray-700 dark:text-gray-300">
                      {info.title.slice(0, 2)}
                    </div>
                    <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <div className="flex flex-col">
                          <a
                            href={info.link}
                            className="text-sm sm:text-base font-medium text-gray-900 dark:text-white hover:underline transition-colors duration-200 truncate"
                          >
                            {info.value}
                          </a>
                          {info.secondaryValue && (
                            <a
                              href={`mailto:${info.secondaryValue}`}
                              className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:underline transition-colors duration-200 truncate"
                            >
                              {info.secondaryValue}
                            </a>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5 sm:mb-6">
                Follow Me
              </h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gray-900 dark:bg-white p-8 rounded-xl text-white dark:text-gray-900">
              <h2 className="text-2xl font-bold mb-4">
                Let's Work Together
              </h2>
              <p className="text-gray-300 dark:text-gray-600 mb-4">
                I'm currently available for freelance projects and full-time opportunities.
                Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-white dark:bg-gray-900 rounded-full mr-3 animate-pulse"></div>
                <span className="text-sm font-medium">Available for new projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
