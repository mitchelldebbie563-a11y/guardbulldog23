# 🗄️ Complete Database Setup Instructions

## 📋 What This Will Create:

Your database will be populated with **realistic, production-ready data**:

### 👥 Users (12 Total):
- **1 Super Admin**: Dr. Sarah Johnson (admin@bowie.edu)
- **2 Admins**: Michael Chen, Jessica Martinez
- **3 Faculty**: Prof. David Williams, Dr. Emily Brown, Prof. Robert Taylor
- **6 Students**: James, Maria, Kevin, Ashley, Christopher, Sophia

### 📧 Phishing Reports (10 Total):
- **2 Critical**: Fake IT password reset, Fake financial aid
- **3 High Priority**: Microsoft 365 alert, Amazon delivery, LinkedIn compromise
- **3 Medium**: Google Drive share, Campus survey, Instagram DM
- **2 Low**: Text message scam, Netflix subscription

### 📚 Education Modules (6 Complete Courses):
1. **Introduction to Phishing** (15 min) - Basics for beginners
2. **Recognizing Email Phishing** (20 min) - Intermediate email security
3. **Social Media Security** (18 min) - Protecting social accounts
4. **Password Security Best Practices** (25 min) - Creating strong passwords
5. **Mobile Device Security** (22 min) - Smartphone protection
6. **Reporting and Response** (30 min) - Advanced incident handling

Each module includes:
- Comprehensive content
- Real-world examples
- Interactive quizzes
- Bowie State-specific guidance

### 📊 Additional Data:
- **7 Admin Notes** on reports
- **10 User Progress** records (students completing courses)
- **8 Audit Logs** (system activity)

---

## 🚀 Setup Method 1: Supabase SQL Editor (Recommended)

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard/project/qbwvgznwpkvxltjmqnvu
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New query"**

### Step 2: Copy the SQL Script
1. Open the file: `create-complete-database.sql`
2. **Select All** (Ctrl+A)
3. **Copy** (Ctrl+C)

### Step 3: Run the Script
1. **Paste** into Supabase SQL Editor (Ctrl+V)
2. Click **"Run"** button (or press Ctrl+Enter)
3. Wait for completion (should take 5-10 seconds)
4. You should see "Success. No rows returned"

### Step 4: Verify Data
1. Click **"Table Editor"** in left sidebar
2. Check these tables:
   - **users** - Should have 12 rows
   - **reports** - Should have 10 rows
   - **education_modules** - Should have 6 rows
   - **user_progress** - Should have 10 rows

---

## 🚀 Setup Method 2: Command Line (Alternative)

If you prefer command line:

```bash
# Install PostgreSQL client (if not installed)
# Then run:
psql "postgresql://postgres:Steve2025@#$$@db.qbwvgznwpkvxltjmqnvu.supabase.co:5432/postgres" -f create-complete-database.sql
```

---

## 🔑 Demo Account Credentials

**Note**: The SQL script includes placeholder hashes. You'll need to create real passwords through the registration page, OR update the script with actual bcrypt hashes.

### To Create Real Demo Accounts:

#### Option A: Register Through Website
1. Go to: https://elaborate-dragon-93e37d.netlify.app
2. Click "Register"
3. Create accounts with these emails:
   - admin@bowie.edu (Super Admin)
   - security@bowie.edu (Admin)
   - student@bowie.edu (Student)
   - faculty@bowie.edu (Faculty)

#### Option B: Generate Password Hashes
Run this Node.js script to generate hashes:

```javascript
const bcrypt = require('bcryptjs');

async function generateHashes() {
  const passwords = {
    'Admin123!': await bcrypt.hash('Admin123!', 10),
    'Security123!': await bcrypt.hash('Security123!', 10),
    'Student123!': await bcrypt.hash('Student123!', 10),
    'Faculty123!': await bcrypt.hash('Faculty123!', 10)
  };
  console.log(passwords);
}

generateHashes();
```

Then update the SQL INSERT statements with real hashes.

---

## 📊 What You'll See After Setup:

### Dashboard Statistics:
- **Total Reports**: 10
- **Pending Reports**: 3
- **Critical Reports**: 2
- **Resolved Reports**: 3
- **Active Users**: 12
- **Completed Training**: 7 students

### Trending Threats:
1. Email Phishing (7 reports)
2. Social Media (2 reports)
3. SMS Phishing (1 report)

### Recent Activity:
- Latest reports from past 3 days
- Admin responses and notes
- Student training completions

---

## 🎓 Education Content Highlights:

### Module 1: Introduction to Phishing
- What is phishing?
- Common types (email, spear, whaling, smishing, vishing)
- Red flags to watch for
- Protection strategies
- 3-question quiz

### Module 2: Recognizing Email Phishing
- Anatomy of phishing emails
- Real examples from Bowie State
- Link inspection techniques
- Attachment red flags
- Best practices
- 3-question quiz

### Module 3: Social Media Security
- Common social media scams
- Fake friend requests
- Malicious links
- Privacy settings
- Official Bowie State accounts
- 3-question quiz

### Module 4: Password Security
- Creating strong passwords
- Password managers
- Multi-factor authentication
- Bowie State requirements
- 3-question quiz

### Module 5: Mobile Device Security
- Smishing threats
- Malicious apps
- Public WiFi risks
- QR code scams
- Campus WiFi guidance
- 3-question quiz

### Module 6: Reporting and Response
- When to report
- How to report at Bowie State
- What to do if you clicked a link
- If you provided credentials
- Campus-wide response process
- 3-question quiz

---

## ✅ Verification Checklist

After running the SQL script, verify:

- [ ] 12 users created
- [ ] 10 phishing reports added
- [ ] 7 admin notes on reports
- [ ] 6 education modules with full content
- [ ] 10 user progress records
- [ ] 8 audit log entries
- [ ] All tables have proper indexes
- [ ] Foreign key relationships working

---

## 🎯 Next Steps After Database Setup:

1. **Test Login**: Try logging in with demo accounts
2. **Browse Reports**: View the phishing reports dashboard
3. **Take a Course**: Complete an education module
4. **Submit a Report**: Test the report submission form
5. **Admin Functions**: Test admin dashboard and report management

---

## 🆘 Troubleshooting:

### "Permission denied" error:
- Make sure you're logged into Supabase
- Verify you have admin access to the project

### "Relation already exists" error:
- The script drops existing tables first
- If error persists, manually drop tables in Table Editor

### "Syntax error" in SQL:
- Make sure you copied the entire script
- Check for any missing characters

### Password hashes not working:
- Use the registration page to create real accounts
- Or generate proper bcrypt hashes

---

## 📞 Support:

If you encounter issues:
1. Check Supabase logs in Dashboard → Logs
2. Verify connection string is correct
3. Ensure database is active and not paused
4. Contact Supabase support if needed

---

**Ready to populate your database? Follow Method 1 above!** 🚀

**Estimated time: 5 minutes**
