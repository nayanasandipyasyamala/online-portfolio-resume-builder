const express = require('express');
const auth = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// GET /api/portfolio - Get current user's portfolio
router.get('/', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.userId });
    if (!portfolio) {
      portfolio = await Portfolio.create({ userId: req.userId });
    }
    res.json(portfolio);
  } catch (err) {
    console.error('Get portfolio error:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio.' });
  }
});

// PUT /api/portfolio - Update current user's portfolio
router.put('/', auth, async (req, res) => {
  try {
    const allowedFields = [
      'name', 'username', 'email', 'bio', 'role', 'avatar',
      'skills', 'projects', 'experience', 'education',
      'template', 'isPublished', 'socialLinks', 'settings'
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.userId },
      { $set: updates },
      { new: true, upsert: true }
    );

    res.json(portfolio);
  } catch (err) {
    console.error('Update portfolio error:', err);
    res.status(500).json({ error: 'Failed to update portfolio.' });
  }
});

// GET /api/portfolio/public/:username - Get public portfolio by username
router.get('/public/:username', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({
      username: req.params.username,
      isPublished: true,
    });

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found or not published.' });
    }

    res.json(portfolio);
  } catch (err) {
    console.error('Public portfolio error:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio.' });
  }
});

module.exports = router;
