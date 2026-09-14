import express from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const router = express.Router();

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Validation rules (flexible so legitimate short messages work)
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email address'),
  body('subject')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Subject must be between 2 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 2, max: 2000 })
    .withMessage('Message must be between 2 and 2000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0]?.msg || 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, subject, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message
    });

    await contact.save();

    // Send email notification in background (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS.trim() !== '') {
      try {
        const transporter = createTransporter();
        const mailOptions = {
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
          `
        };

        transporter.sendMail(mailOptions).catch(emailError => {
          console.error('Background email sending failed:', emailError.message);
        });
      } catch (transporterErr) {
        console.warn('Transporter creation failed:', transporterErr.message);
      }
    }

    // Return instant success to the client
    return res.status(201).json({
      success: true,
      message: 'Thank you for your message! I will get back to you soon.',
      data: {
        id: contact._id,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form: ' + (error.message || 'Internal server error')
    });
  }
});

// GET /api/contact - Get all contact messages (for admin use)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      success: true,
      messages: contacts,
      count: contacts.length
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact messages'
    });
  }
});

// GET /api/contact/:id - Get specific contact message
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact message'
    });
  }
});

// PATCH /api/contact/:id/read - Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    ).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message marked as read',
      data: contact
    });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update message status'
    });
  }
});

// DELETE /api/contact/:id - Delete contact message
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact message'
    });
  }
});

export default router;
