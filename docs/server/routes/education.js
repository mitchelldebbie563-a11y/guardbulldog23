const express = require('express');
const { body, validationResult } = require('express-validator');
const EducationModule = require('../models/EducationModule');
const User = require('../models/User');
const { authenticateToken, requireStaffOrAdmin, logActivity } = require('../middleware/auth');

const router = express.Router();

// Get all active education modules
router.get('/modules', authenticateToken, async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const modules = await EducationModule.find(query)
      .select('-content.sections.content -quiz.questions.correctAnswer')
      .sort({ category: 1, difficulty: 1, createdAt: 1 });

    res.json(modules);
  } catch (error) {
    console.error('Fetch modules error:', error);
    res.status(500).json({ message: 'Server error fetching modules' });
  }
});

// Get specific module with full content
router.get('/modules/:moduleId', authenticateToken, async (req, res) => {
  try {
    const module = await EducationModule.findById(req.params.moduleId)
      .populate('createdBy', 'firstName lastName');

    if (!module || !module.isActive) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Hide correct answers from students
    if (req.user.role === 'student') {
      if (module.quiz && module.quiz.questions) {
        module.quiz.questions.forEach(question => {
          delete question.correctAnswer;
        });
      }
    }

    res.json(module);
  } catch (error) {
    console.error('Fetch module error:', error);
    res.status(500).json({ message: 'Server error fetching module' });
  }
});

// Submit quiz answers
router.post('/modules/:moduleId/quiz', [
  authenticateToken,
  body('answers').isArray().withMessage('Answers must be an array'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { answers, timeSpent } = req.body;
    const module = await EducationModule.findById(req.params.moduleId);

    if (!module || !module.isActive) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Check if user already completed this module
    const user = await User.findById(req.user._id);
    const existingCompletion = user.educationProgress.completedModules.find(
      cm => cm.moduleId === req.params.moduleId
    );

    if (existingCompletion) {
      return res.status(400).json({ message: 'Module already completed' });
    }

    // Calculate score
    let correctAnswers = 0;
    const totalQuestions = module.quiz.questions.length;
    const results = [];

    module.quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers += question.points || 1;
      }

      results.push({
        questionIndex: index,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        points: isCorrect ? (question.points || 1) : 0
      });
    });

    const totalPoints = module.getTotalPoints();
    const score = Math.round((correctAnswers / totalPoints) * 100);
    const passed = score >= module.quiz.passingScore;

    if (passed) {
      // Add to user's completed modules
      user.educationProgress.completedModules.push({
        moduleId: req.params.moduleId,
        completedAt: new Date(),
        score
      });
      user.educationProgress.totalScore += score;
      await user.save();

      // Update module statistics
      await module.updateStatistics(timeSpent, score);
    }

    res.json({
      score,
      passed,
      passingScore: module.quiz.passingScore,
      correctAnswers,
      totalQuestions: totalPoints,
      results,
      timeSpent
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    res.status(500).json({ message: 'Server error submitting quiz' });
  }
});

// Get user's education progress
router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('educationProgress.completedModules.moduleId', 'title category difficulty');

    const totalModules = await EducationModule.countDocuments({ isActive: true });
    const completedCount = user.educationProgress.completedModules.length;

    // Get recommended modules
    const recommended = await EducationModule.getRecommendedModules(user.educationProgress, 3);

    res.json({
      progress: user.educationProgress,
      stats: {
        completedModules: completedCount,
        totalModules,
        completionRate: totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0
      },
      recommended
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ message: 'Server error fetching progress' });
  }
});

// Create new education module (staff/admin only)
router.post('/modules', [
  authenticateToken,
  requireStaffOrAdmin,
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('description').trim().isLength({ min: 1 }).withMessage('Description is required'),
  body('category').isIn(['basics', 'identification', 'prevention', 'response', 'advanced']),
  body('difficulty').isIn(['beginner', 'intermediate', 'advanced']),
  body('estimatedTime').isNumeric().withMessage('Estimated time must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const moduleData = {
      ...req.body,
      createdBy: req.user._id
    };

    const module = new EducationModule(moduleData);
    await module.save();

    res.status(201).json({
      message: 'Education module created successfully',
      module
    });
  } catch (error) {
    console.error('Module creation error:', error);
    res.status(500).json({ message: 'Server error creating module' });
  }
});

// Update education module (staff/admin only)
router.put('/modules/:moduleId', [
  authenticateToken,
  requireStaffOrAdmin,
  body('title').optional().trim().isLength({ min: 1 }),
  body('description').optional().trim().isLength({ min: 1 }),
  body('category').optional().isIn(['basics', 'identification', 'prevention', 'response', 'advanced']),
  body('difficulty').optional().isIn(['beginner', 'intermediate', 'advanced'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const module = await EducationModule.findByIdAndUpdate(
      req.params.moduleId,
      { ...req.body, lastUpdated: new Date() },
      { new: true, runValidators: true }
    );

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json({
      message: 'Module updated successfully',
      module
    });
  } catch (error) {
    console.error('Module update error:', error);
    res.status(500).json({ message: 'Server error updating module' });
  }
});

// Delete education module (admin only)
router.delete('/modules/:moduleId', [
  authenticateToken,
  requireStaffOrAdmin
], async (req, res) => {
  try {
    const module = await EducationModule.findByIdAndUpdate(
      req.params.moduleId,
      { isActive: false },
      { new: true }
    );

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json({ message: 'Module deactivated successfully' });
  } catch (error) {
    console.error('Module deletion error:', error);
    res.status(500).json({ message: 'Server error deleting module' });
  }
});

// Get module statistics (staff/admin only)
router.get('/modules/:moduleId/stats', [
  authenticateToken,
  requireStaffOrAdmin
], async (req, res) => {
  try {
    const module = await EducationModule.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Get detailed completion data
    const completions = await User.aggregate([
      { $unwind: '$educationProgress.completedModules' },
      { $match: { 'educationProgress.completedModules.moduleId': req.params.moduleId } },
      { $group: {
        _id: null,
        totalCompletions: { $sum: 1 },
        averageScore: { $avg: '$educationProgress.completedModules.score' },
        scores: { $push: '$educationProgress.completedModules.score' }
      }}
    ]);

    const stats = completions[0] || {
      totalCompletions: 0,
      averageScore: 0,
      scores: []
    };

    res.json({
      ...module.statistics,
      ...stats,
      scoreDistribution: calculateScoreDistribution(stats.scores)
    });
  } catch (error) {
    console.error('Module stats error:', error);
    res.status(500).json({ message: 'Server error fetching module statistics' });
  }
});

// Helper function to calculate score distribution
function calculateScoreDistribution(scores) {
  const distribution = { '0-20': 0, '21-40': 0, '41-60': 0, '61-80': 0, '81-100': 0 };
  
  scores.forEach(score => {
    if (score <= 20) distribution['0-20']++;
    else if (score <= 40) distribution['21-40']++;
    else if (score <= 60) distribution['41-60']++;
    else if (score <= 80) distribution['61-80']++;
    else distribution['81-100']++;
  });
  
  return distribution;
}

module.exports = router;
