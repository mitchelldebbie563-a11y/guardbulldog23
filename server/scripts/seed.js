require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Check if users already exist
    const existingUsers = await db.query('SELECT COUNT(*) FROM users');
    if (parseInt(existingUsers.rows[0].count) > 0) {
      console.log('⚠️  Database already has users. Skipping seed.');
      process.exit(0);
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(12);
    const adminPassword = await bcrypt.hash('Admin123!', salt);
    const securityPassword = await bcrypt.hash('Security123!', salt);
    const studentPassword = await bcrypt.hash('Student123!', salt);
    const facultyPassword = await bcrypt.hash('Faculty123!', salt);

    // Insert demo users
    console.log('👥 Creating demo users...');
    
    // Super Admin
    await db.query(`
      INSERT INTO users ("firstName", "lastName", email, password, role, department)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, ['Admin', 'User', 'admin@bowie.edu', adminPassword, 'super_admin', 'IT Security']);

    // Admin
    await db.query(`
      INSERT INTO users ("firstName", "lastName", email, password, role, department)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, ['Security', 'Officer', 'security@bowie.edu', securityPassword, 'admin', 'IT Security']);

    // Student
    await db.query(`
      INSERT INTO users ("firstName", "lastName", email, password, role, department)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, ['John', 'Student', 'student@bowie.edu', studentPassword, 'user', 'Computer Science']);

    // Faculty
    await db.query(`
      INSERT INTO users ("firstName", "lastName", email, password, role, department)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, ['Jane', 'Professor', 'faculty@bowie.edu', facultyPassword, 'user', 'Cybersecurity']);

    console.log('✅ Demo users created successfully!');

    // Get student user ID for sample reports
    const studentUser = await db.query(`SELECT id FROM users WHERE email = 'student@bowie.edu'`);
    const studentId = studentUser.rows[0].id;

    // Insert sample reports
    console.log('📧 Creating sample phishing reports...');
    
    await db.query(`
      INSERT INTO reports ("reportedBy", "emailSubject", "senderEmail", "emailBody", "reportType", status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      studentId,
      'Urgent: Verify Your Account',
      'noreply@suspicious-bank.com',
      'Your account has been compromised. Click here to verify your identity immediately.',
      'phishing',
      'pending'
    ]);

    await db.query(`
      INSERT INTO reports ("reportedBy", "emailSubject", "senderEmail", "emailBody", "reportType", status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      studentId,
      'You Won $1,000,000!',
      'lottery@fake-lottery.com',
      'Congratulations! You have won our grand prize. Send us your bank details to claim.',
      'spam',
      'investigating'
    ]);

    await db.query(`
      INSERT INTO reports ("reportedBy", "emailSubject", "senderEmail", "emailBody", "reportType", status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      studentId,
      'IT Department: Password Reset Required',
      'admin@bowie-edu.net',
      'This is a fake email pretending to be from IT. Please reset your password by clicking this link.',
      'phishing',
      'resolved'
    ]);

    console.log('✅ Sample reports created successfully!');

    // Insert education modules
    console.log('📚 Creating education modules...');
    
    await db.query(`
      INSERT INTO education_modules (title, description, content, difficulty, "estimatedTime", category)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      'Introduction to Phishing',
      'Learn the basics of phishing attacks and how to identify them',
      'Phishing is a type of social engineering attack where attackers try to trick you into revealing sensitive information...',
      'beginner',
      15,
      'Phishing Awareness'
    ]);

    await db.query(`
      INSERT INTO education_modules (title, description, content, difficulty, "estimatedTime", category)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      'Email Security Best Practices',
      'Essential practices for maintaining email security',
      'Learn how to protect your email account and identify suspicious messages...',
      'intermediate',
      20,
      'Email Security'
    ]);

    await db.query(`
      INSERT INTO education_modules (title, description, content, difficulty, "estimatedTime", category)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [
      'Advanced Threat Detection',
      'Advanced techniques for identifying sophisticated phishing attempts',
      'This module covers advanced phishing techniques and how to detect them...',
      'advanced',
      30,
      'Advanced Security'
    ]);

    console.log('✅ Education modules created successfully!');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Demo Account Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Super Admin:');
    console.log('  Email: admin@bowie.edu');
    console.log('  Password: Admin123!');
    console.log('');
    console.log('Admin:');
    console.log('  Email: security@bowie.edu');
    console.log('  Password: Security123!');
    console.log('');
    console.log('Student:');
    console.log('  Email: student@bowie.edu');
    console.log('  Password: Student123!');
    console.log('');
    console.log('Faculty:');
    console.log('  Email: faculty@bowie.edu');
    console.log('  Password: Faculty123!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
