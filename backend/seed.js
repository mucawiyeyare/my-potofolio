import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://your-ecommerce-demo.com',
    imageUrl: 'https://via.placeholder.com/400x250',
    featured: true,
    order: 1
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Express.js', 'Socket.io', 'PostgreSQL'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://your-taskmanager-demo.com',
    imageUrl: 'https://via.placeholder.com/400x250',
    featured: true,
    order: 2
  },
  {
    title: 'Weather Dashboard',
    description: 'A responsive weather application with location-based forecasts, interactive maps, and weather alerts.',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://your-weather-demo.com',
    imageUrl: 'https://via.placeholder.com/400x250',
    featured: false,
    order: 3
  },
  {
    title: 'Blog Platform',
    description: 'A modern blogging platform with markdown support, comment system, and SEO optimization.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Markdown'],
    githubUrl: 'https://github.com/yourusername/blog-platform',
    liveUrl: 'https://your-blog-demo.com',
    imageUrl: 'https://via.placeholder.com/400x250',
    featured: false,
    order: 4
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Sample projects inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();