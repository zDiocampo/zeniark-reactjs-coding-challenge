const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get all questions from MongoDB
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find({});
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
});

module.exports = router;