const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String,
  github: String,
  image: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  duration: String,
  description: String,
});

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String,
});

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, default: '' },
  username: { type: String, default: '' },
  email: { type: String, default: '' },
  bio: { type: String, default: '' },
  role: { type: String, default: '' },
  avatar: { type: String, default: '' },
  skills: [String],
  projects: [projectSchema],
  experience: [experienceSchema],
  education: [educationSchema],
  template: { type: String, default: 'minimal' },
  isPublished: { type: Boolean, default: false },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    website: String,
  },
  settings: {
    redirectUrl: String,
    primaryColor: { type: String, default: '#000000' },
  },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
