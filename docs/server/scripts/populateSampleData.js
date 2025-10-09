// Script to populate the database with sample data for testing
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('../models/User');
const EducationModule = require('../models/EducationModule');
const Report = require('../models/Report');

// Import sample data
const sampleModules = require('../data/sampleEducationModules');
const samplePhishingExamples = require('../data/samplePhishingExamples');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guardbulldog');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function createSampleUsers() {
  console.log('📝 Creating sample users...');
  
  const users = [
    {
      email: 'admin@bowie.edu',
      password: await bcrypt.hash('Admin123!', 12),
      firstName: 'System',
      lastName: 'Administrator',
      role: 'super_admin',
      department: 'Information Technology',
      isActive: true,
      emailVerified: true
    },
    {
      email: 'security@bowie.edu',
      password: await bcrypt.hash('Security123!', 12),
      firstName: 'Security',
      lastName: 'Manager',
      role: 'admin',
      department: 'Cybersecurity',
      isActive: true,
      emailVerified: true
    },
    {
      email: 'student@bowie.edu',
      password: await bcrypt.hash('Student123!', 12),
      firstName: 'John',
      lastName: 'Student',
      role: 'user',
      department: 'Computer Science',
      isActive: true,
      emailVerified: true
    },
    {
      email: 'faculty@bowie.edu',
      password: await bcrypt.hash('Faculty123!', 12),
      firstName: 'Jane',
      lastName: 'Professor',
      role: 'user',
      department: 'Information Sciences',
      isActive: true,
      emailVerified: true
    }
  ];

  for (const userData of users) {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) {
      const user = new User(userData);
      await user.save();
      console.log(`✅ Created user: ${userData.email}`);
    } else {
      console.log(`⚠️  User already exists: ${userData.email}`);
    }
  }
}

async function createEducationModules() {
  console.log('📚 Creating education modules...');
  
  for (const moduleData of sampleModules) {
    const existingModule = await EducationModule.findOne({ title: moduleData.title });
    if (!existingModule) {
      const module = new EducationModule(moduleData);
      await module.save();
      console.log(`✅ Created module: ${moduleData.title}`);
    } else {
      console.log(`⚠️  Module already exists: ${moduleData.title}`);
    }
  }
}

async function createSampleReports() {
  console.log('📧 Creating sample phishing reports...');
  
  // Get sample users
  const studentUser = await User.findOne({ email: 'student@bowie.edu' });
  const facultyUser = await User.findOne({ email: 'faculty@bowie.edu' });
  
  if (!studentUser || !facultyUser) {
    console.log('⚠️  Sample users not found, skipping report creation');
    return;
  }

  const reports = [
    {
      reportedBy: studentUser._id,
      emailDetails: {
        subject: samplePhishingExamples[0].emailExample.subject,
        sender: samplePhishingExamples[0].emailExample.sender,
        recipient: 'student@bowie.edu',
        receivedDate: new Date(samplePhishingExamples[0].emailExample.receivedDate),
        content: samplePhishingExamples[0].emailExample.content,
        headers: {
          'Return-Path': samplePhishingExamples[0].emailExample.sender,
          'Message-ID': '<fake-message-id-001@phisher.com>',
          'X-Originating-IP': '192.168.1.100'
        }
      },
      reportType: 'suspicious_email',
      severity: 'high',
      status: 'under_review',
      analysisResults: {
        riskScore: 85,
        indicators: samplePhishingExamples[0].phishingIndicators.map(ind => ({
          type: ind.indicator,
          description: ind.description,
          severity: ind.severity,
          confidence: 0.9
        })),
        classification: 'phishing',
        aiAnalysis: 'High probability phishing attempt with multiple red flags including suspicious domain and urgent language.'
      },
      adminNotes: [
        {
          note: 'Confirmed phishing attempt. Added to threat intelligence database.',
          addedBy: 'security@bowie.edu',
          addedAt: new Date()
        }
      ]
    },
    {
      reportedBy: facultyUser._id,
      emailDetails: {
        subject: samplePhishingExamples[1].emailExample.subject,
        sender: samplePhishingExamples[1].emailExample.sender,
        recipient: 'faculty@bowie.edu',
        receivedDate: new Date(samplePhishingExamples[1].emailExample.receivedDate),
        content: samplePhishingExamples[1].emailExample.content,
        headers: {
          'Return-Path': samplePhishingExamples[1].emailExample.sender,
          'Message-ID': '<fake-message-id-002@phisher.com>',
          'X-Originating-IP': '10.0.0.50'
        }
      },
      reportType: 'suspicious_email',
      severity: 'critical',
      status: 'resolved',
      analysisResults: {
        riskScore: 95,
        indicators: samplePhishingExamples[1].phishingIndicators.map(ind => ({
          type: ind.indicator,
          description: ind.description,
          severity: ind.severity,
          confidence: 0.95
        })),
        classification: 'phishing',
        aiAnalysis: 'Critical phishing attempt targeting university credentials. Domain impersonation detected.'
      },
      adminNotes: [
        {
          note: 'Blocked sender domain. Sent security alert to all users.',
          addedBy: 'security@bowie.edu',
          addedAt: new Date()
        }
      ]
    }
  ];

  for (const reportData of reports) {
    const report = new Report(reportData);
    await report.save();
    console.log(`✅ Created report: ${reportData.emailDetails.subject.substring(0, 50)}...`);
  }
}

async function updateUserProgress() {
  console.log('📈 Updating user education progress...');
  
  const student = await User.findOne({ email: 'student@bowie.edu' });
  const modules = await EducationModule.find().limit(2);
  
  if (student && modules.length > 0) {
    // Add some progress for the student
    student.educationProgress = modules.map(module => ({
      moduleId: module._id,
      completed: Math.random() > 0.5,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      completedAt: new Date(),
      attempts: 1
    }));
    
    await student.save();
    console.log('✅ Updated student education progress');
  }
}

async function populateDatabase() {
  console.log('🚀 Starting database population...');
  
  try {
    await connectDB();
    
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await User.deleteMany({});
    // await EducationModule.deleteMany({});
    // await Report.deleteMany({});
    // console.log('🗑️  Cleared existing data');
    
    await createSampleUsers();
    await createEducationModules();
    await createSampleReports();
    await updateUserProgress();
    
    console.log('✅ Database population completed successfully!');
    console.log('\n📋 Sample Login Credentials:');
    console.log('Super Admin: admin@bowie.edu / Admin123!');
    console.log('Admin: security@bowie.edu / Security123!');
    console.log('Student: student@bowie.edu / Student123!');
    console.log('Faculty: faculty@bowie.edu / Faculty123!');
    
  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the script
if (require.main === module) {
  populateDatabase();
}

module.exports = { populateDatabase };
