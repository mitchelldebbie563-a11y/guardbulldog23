const mongoose = require('mongoose');

const educationModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['basics', 'identification', 'prevention', 'response', 'advanced'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  content: {
    sections: [{
      title: String,
      content: String,
      type: {
        type: String,
        enum: ['text', 'video', 'interactive', 'quiz'],
        default: 'text'
      },
      mediaUrl: String,
      order: Number
    }]
  },
  quiz: {
    questions: [{
      question: String,
      type: {
        type: String,
        enum: ['multiple_choice', 'true_false', 'scenario'],
        default: 'multiple_choice'
      },
      options: [String],
      correctAnswer: String,
      explanation: String,
      points: {
        type: Number,
        default: 1
      }
    }],
    passingScore: {
      type: Number,
      default: 70
    },
    maxAttempts: {
      type: Number,
      default: 3
    }
  },
  examples: [{
    title: String,
    description: String,
    emailExample: {
      subject: String,
      sender: String,
      content: String,
      headers: String
    },
    indicators: [String],
    riskLevel: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    }
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationModule'
  }],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  statistics: {
    totalCompletions: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
educationModuleSchema.index({ category: 1, difficulty: 1 });
educationModuleSchema.index({ isActive: 1, createdAt: -1 });

// Method to calculate total points for the module
educationModuleSchema.methods.getTotalPoints = function() {
  if (!this.quiz || !this.quiz.questions) return 0;
  return this.quiz.questions.reduce((total, question) => total + (question.points || 1), 0);
};

// Method to update statistics
educationModuleSchema.methods.updateStatistics = function(completionTime, score) {
  this.statistics.totalCompletions += 1;
  
  // Update average score
  const totalScore = (this.statistics.averageScore * (this.statistics.totalCompletions - 1)) + score;
  this.statistics.averageScore = totalScore / this.statistics.totalCompletions;
  
  // Update average time
  const totalTime = (this.statistics.averageTime * (this.statistics.totalCompletions - 1)) + completionTime;
  this.statistics.averageTime = totalTime / this.statistics.totalCompletions;
  
  return this.save();
};

// Static method to get modules by category
educationModuleSchema.statics.getByCategory = function(category, difficulty = null) {
  const query = { category, isActive: true };
  if (difficulty) query.difficulty = difficulty;
  
  return this.find(query).sort({ createdAt: 1 });
};

// Static method to get recommended modules for user
educationModuleSchema.statics.getRecommendedModules = function(userProgress, limit = 5) {
  const completedModuleIds = userProgress.completedModules.map(m => m.moduleId);
  
  return this.find({
    _id: { $nin: completedModuleIds },
    isActive: true
  })
  .sort({ difficulty: 1, createdAt: 1 })
  .limit(limit);
};

module.exports = mongoose.model('EducationModule', educationModuleSchema);
