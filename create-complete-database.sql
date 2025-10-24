-- ========================================
-- GUARDBULLDOG - Complete Database Setup
-- ========================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS education_modules CASCADE;
DROP TABLE IF EXISTS report_notes CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    department VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reports Table
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    severity VARCHAR(50) DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'pending',
    sender_email VARCHAR(255),
    sender_name VARCHAR(255),
    subject_line TEXT,
    received_date TIMESTAMP,
    suspicious_links TEXT[],
    attachments TEXT[],
    ip_address VARCHAR(50),
    headers TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Report Notes Table
CREATE TABLE report_notes (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES reports(id) ON DELETE CASCADE,
    admin_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Education Modules Table
CREATE TABLE education_modules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    category VARCHAR(100),
    difficulty VARCHAR(50) DEFAULT 'beginner',
    duration INTEGER DEFAULT 10,
    quiz_questions JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Progress Table
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    module_id INTEGER REFERENCES education_modules(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    score INTEGER,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, module_id)
);

-- Create Audit Logs Table
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- INSERT DEMO DATA
-- ========================================

-- Insert Users (passwords: Admin123!, Security123!, Student123!, Faculty123!)
INSERT INTO users (name, email, password, role, department, phone) VALUES
-- Super Admin (password: Admin123!)
('Dr. Sarah Johnson', 'admin@bowie.edu', '$2a$10$O53C9robYINHuww/IG8yIuC8pkzsxJQ.oYdNkPL8vAuoOrcu36VcK', 'super_admin', 'IT Security', '301-860-4000'),

-- Admins (password: Security123!)
('Michael Chen', 'security@bowie.edu', '$2a$10$2v.jkZtsn/hkeGzkSWrTzeEqrrrt5EfAXq3l06zdyOdu/bA1ruRjS', 'admin', 'Cybersecurity', '301-860-4001'),
('Jessica Martinez', 'jmartinez@bowie.edu', '$2a$10$2v.jkZtsn/hkeGzkSWrTzeEqrrrt5EfAXq3l06zdyOdu/bA1ruRjS', 'admin', 'IT Department', '301-860-4002'),

-- Faculty (password: Faculty123!)
('Prof. David Williams', 'faculty@bowie.edu', '$2a$10$7BqM6Xod8bFRZHZ9T6.Pf.77wTvc7DdxtjeuV1aayvuR0CEXQGJpu', 'faculty', 'Computer Science', '301-860-4100'),
('Dr. Emily Brown', 'ebrown@bowie.edu', '$2a$10$7BqM6Xod8bFRZHZ9T6.Pf.77wTvc7DdxtjeuV1aayvuR0CEXQGJpu', 'faculty', 'Information Systems', '301-860-4101'),
('Prof. Robert Taylor', 'rtaylor@bowie.edu', '$2a$10$7BqM6Xod8bFRZHZ9T6.Pf.77wTvc7DdxtjeuV1aayvuR0CEXQGJpu', 'faculty', 'Business Administration', '301-860-4102'),

-- Students (password: Student123!)
('James Anderson', 'student@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Computer Science', '240-123-4567'),
('Maria Garcia', 'mgarcia@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Cybersecurity', '240-123-4568'),
('Kevin Thompson', 'kthompson@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Information Technology', '240-123-4569'),
('Ashley Davis', 'adavis@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Business', '240-123-4570'),
('Christopher Lee', 'clee@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Engineering', '240-123-4571'),
('Sophia Martinez', 'smartinez@bowie.edu', '$2a$10$PSTzoeDaTUgqmN46ky1wfuPrbN8TG6jHjotLjWBs6WLH7g1eR/wb6', 'student', 'Computer Science', '240-123-4572');

-- Insert Phishing Reports
INSERT INTO reports (user_id, title, description, category, severity, status, sender_email, sender_name, subject_line, received_date, suspicious_links, ip_address) VALUES
-- Critical Reports
(7, 'Fake IT Department Password Reset', 
'Received email claiming to be from IT department asking to reset password immediately. Email had urgent tone and suspicious link.', 
'email_phishing', 'critical', 'investigating', 
'it-support@bowie-edu.com', 'IT Support Team', 
'URGENT: Your Bowie Email Will Be Deleted in 24 Hours', 
NOW() - INTERVAL '2 hours',
ARRAY['http://bowie-edu-verify.tk/reset', 'http://suspicious-link.com/login'],
'185.220.101.45'),

(8, 'Fake Financial Aid Office Email', 
'Email claiming I won a scholarship and need to provide bank details to receive funds. Very suspicious!', 
'email_phishing', 'critical', 'resolved', 
'financialaid@bowie.support', 'Financial Aid Office', 
'Congratulations! You have been selected for $5000 Emergency Grant', 
NOW() - INTERVAL '1 day',
ARRAY['http://bowie-grants.xyz/claim', 'http://fake-portal.com/verify'],
'91.219.237.244'),

-- High Priority Reports
(9, 'Suspicious Microsoft 365 Login Alert', 
'Got email about unusual login activity on my Microsoft account. Link looks fake when I hover over it.', 
'email_phishing', 'high', 'investigating', 
'no-reply@microsoft-security.net', 'Microsoft Security Team', 
'Unusual sign-in activity detected on your account', 
NOW() - INTERVAL '5 hours',
ARRAY['http://microsoft-verify-account.com/secure'],
'45.142.212.61'),

(10, 'Fake Amazon Package Delivery', 
'Email about failed package delivery with link to reschedule. I did not order anything from Amazon.', 
'email_phishing', 'high', 'pending', 
'delivery@amazon-logistics.info', 'Amazon Delivery Service', 
'Your package could not be delivered - Action Required', 
NOW() - INTERVAL '3 hours',
ARRAY['http://amazon-redelivery.com/track'],
'103.109.247.10'),

(11, 'Compromised LinkedIn Account Warning', 
'Received message on LinkedIn from connection with suspicious job offer link. Their account may be hacked.', 
'social_media', 'high', 'investigating', 
'jobs@linkedin-careers.net', 'LinkedIn Talent Solutions', 
'Exclusive Job Opportunity - $85/hour Remote Position', 
NOW() - INTERVAL '8 hours',
ARRAY['http://linkedin-jobs-portal.com/apply'],
'194.26.192.187'),

-- Medium Priority Reports
(7, 'Suspicious Google Drive Share', 
'Received email about shared document from unknown sender. Link asks for Google login credentials.', 
'email_phishing', 'medium', 'resolved', 
'noreply@drive-sharing.com', 'Google Drive', 
'Important Document Shared With You', 
NOW() - INTERVAL '2 days',
ARRAY['http://drive-google-docs.com/view'],
'185.220.102.8'),

(8, 'Fake Bowie State Survey', 
'Email asking to complete survey about campus services with promise of gift card. Link looks suspicious.', 
'email_phishing', 'medium', 'pending', 
'survey@bowie-feedback.com', 'BSU Student Affairs', 
'Complete Our 5-Minute Survey and Get $50 Amazon Gift Card', 
NOW() - INTERVAL '12 hours',
ARRAY['http://bowie-survey.tk/start'],
'45.9.74.42'),

(12, 'Suspicious Instagram DM', 
'Got DM from account impersonating Bowie State official page asking for personal information.', 
'social_media', 'medium', 'investigating', 
'@bowie_state_official_verify', 'Bowie State University', 
'Verify your student status to access exclusive benefits', 
NOW() - INTERVAL '1 day',
ARRAY['http://instagram-verify-bsu.com/student'],
'104.244.42.129'),

-- Low Priority Reports
(9, 'Suspicious Text Message', 
'Received text about package delivery from unknown number with tracking link.', 
'sms_phishing', 'low', 'resolved', 
'+1-888-555-0123', 'USPS Delivery', 
'Your package is waiting. Track here: [link]', 
NOW() - INTERVAL '3 days',
ARRAY['http://usps-track.xyz/12345'],
'Unknown'),

(10, 'Fake Netflix Subscription Email', 
'Email claiming my Netflix subscription failed and asking to update payment method.', 
'email_phishing', 'low', 'pending', 
'billing@netflix-support.com', 'Netflix Billing', 
'Your Netflix subscription has been suspended', 
NOW() - INTERVAL '1 day',
ARRAY['http://netflix-billing-update.com/pay'],
'185.220.101.32');

-- Insert Report Notes (Admin responses)
INSERT INTO report_notes (report_id, admin_id, note) VALUES
(1, 2, 'Confirmed phishing attempt. Domain registered 2 days ago. Added to blocklist.'),
(1, 2, 'Sent campus-wide alert about this phishing campaign. 15 other reports received.'),
(2, 3, 'Verified as phishing. Contacted actual Financial Aid office. They confirmed no such email was sent.'),
(2, 3, 'Case closed. User educated about recognizing financial scams.'),
(3, 2, 'Investigating. Microsoft confirmed this is a known phishing campaign targeting universities.'),
(6, 3, 'Resolved. Google Drive phishing attempt. User credentials were not compromised.'),
(9, 2, 'Common USPS phishing scam. Added number to spam database.');

-- Insert Education Modules
INSERT INTO education_modules (title, description, content, category, difficulty, duration, quiz_questions) VALUES
('Introduction to Phishing', 
'Learn the basics of phishing attacks and how to identify them.',
'# What is Phishing?

Phishing is a cybercrime where attackers impersonate legitimate organizations to steal sensitive information.

## Common Types:
- **Email Phishing**: Fraudulent emails appearing to be from reputable sources
- **Spear Phishing**: Targeted attacks on specific individuals
- **Whaling**: Attacks targeting high-profile individuals
- **Smishing**: Phishing via SMS text messages
- **Vishing**: Voice phishing through phone calls

## Red Flags:
1. Urgent or threatening language
2. Requests for personal information
3. Suspicious sender addresses
4. Poor grammar and spelling
5. Unexpected attachments
6. Too-good-to-be-true offers

## How to Protect Yourself:
- Verify sender identity
- Hover over links before clicking
- Use multi-factor authentication
- Keep software updated
- Report suspicious emails',
'basics', 'beginner', 15,
'[
  {
    "question": "What is phishing?",
    "options": ["A type of fishing", "A cyber attack to steal information", "A computer virus", "A type of spam"],
    "correct": 1
  },
  {
    "question": "Which is a red flag in emails?",
    "options": ["Professional greeting", "Urgent threats", "Clear sender info", "Proper grammar"],
    "correct": 1
  },
  {
    "question": "What should you do with suspicious emails?",
    "options": ["Click links to verify", "Reply asking if real", "Report and delete", "Forward to friends"],
    "correct": 2
  }
]'::jsonb),

('Recognizing Email Phishing', 
'Master the art of identifying phishing emails before they cause harm.',
'# Email Phishing Recognition

## Anatomy of a Phishing Email:

### 1. Sender Analysis
- Check the actual email address, not just the display name
- Look for misspellings in domain names (e.g., @g00gle.com instead of @google.com)
- Be wary of free email services for official communications

### 2. Subject Line Tactics
- URGENT or ACTION REQUIRED in all caps
- Threats of account closure
- Promises of prizes or money
- Security alerts

### 3. Message Content
- Generic greetings ("Dear Customer" instead of your name)
- Poor grammar and spelling errors
- Mismatched logos or branding
- Requests for sensitive information

### 4. Link Inspection
- Hover over links to see actual URL
- Look for HTTP instead of HTTPS
- Check for misspelled domains
- Be suspicious of shortened URLs

### 5. Attachment Red Flags
- Unexpected attachments
- Executable files (.exe, .bat)
- Compressed files from unknown senders
- Office documents with macros

## Real Examples from Bowie State:

**Example 1: Fake IT Department**
❌ From: it-support@bowie-edu.com (note the hyphen)
✅ Real: itsupport@bowie.edu

**Example 2: Urgent Password Reset**
"Your account will be deleted in 24 hours unless you verify immediately!"
- Creates false urgency
- Legitimate IT never threatens account deletion via email

## Best Practices:
1. When in doubt, contact the organization directly
2. Use bookmarked links, not email links
3. Enable spam filters
4. Report suspicious emails to security@bowie.edu',
'email_security', 'intermediate', 20,
'[
  {
    "question": "What is the safest way to check if an email is legitimate?",
    "options": ["Click the link to verify", "Reply to the email", "Contact the organization directly", "Forward to friends"],
    "correct": 2
  },
  {
    "question": "Which domain is suspicious for Bowie State?",
    "options": ["@bowie.edu", "@bowie-edu.com", "@bowiestate.edu", "All are safe"],
    "correct": 1
  },
  {
    "question": "What should you check before clicking a link?",
    "options": ["The link color", "Hover to see actual URL", "The email subject", "The sender name only"],
    "correct": 1
  }
]'::jsonb),

('Social Media Security', 
'Protect yourself from phishing attacks on social media platforms.',
'# Social Media Phishing

Social media platforms are increasingly targeted by phishers due to the wealth of personal information available.

## Common Social Media Scams:

### 1. Fake Friend Requests
- Cloned accounts of people you know
- Requests from attractive strangers
- Profiles with minimal information

### 2. Malicious Links
- "You won''t believe this video of you!"
- Fake news articles
- Phishing quizzes and surveys
- Fake job opportunities

### 3. Account Takeover
- Compromised accounts sending messages
- Requests for money from "friends"
- Suspicious posts from known contacts

### 4. Fake Giveaways
- "Share and tag 10 friends to win"
- Requests for personal information to claim prizes
- Fake brand promotions

## Protection Strategies:

### Privacy Settings
- Limit who can see your posts
- Control who can tag you
- Review tagged photos before they appear
- Disable location sharing

### Authentication
- Enable two-factor authentication
- Use strong, unique passwords
- Review active sessions regularly
- Set up login alerts

### Verification
- Check for verified badges on official accounts
- Verify requests through alternative channels
- Be skeptical of urgent messages
- Question too-good-to-be-true offers

## Bowie State Specific:

Official Bowie State social media accounts:
- Twitter: @BowieState ✓
- Instagram: @bowiestateuniversity ✓
- Facebook: Bowie State University ✓

If you receive messages from accounts claiming to be Bowie State:
1. Check for verification badge
2. Compare with official accounts
3. Report suspicious accounts
4. Contact Student Affairs to verify',
'social_media', 'intermediate', 18,
'[
  {
    "question": "What is a red flag for a social media friend request?",
    "options": ["Mutual friends", "Verified account", "Cloned profile of someone you know", "Complete profile"],
    "correct": 2
  },
  {
    "question": "How can you verify official Bowie State accounts?",
    "options": ["Trust the profile picture", "Check for verification badge", "Count the followers", "Read the bio"],
    "correct": 1
  },
  {
    "question": "What should you do if a friend sends a suspicious link?",
    "options": ["Click it immediately", "Contact them through another method", "Share it with others", "Ignore it"],
    "correct": 1
  }
]'::jsonb),

('Password Security Best Practices', 
'Learn how to create and manage strong passwords to protect your accounts.',
'# Password Security

Passwords are your first line of defense against unauthorized access.

## Creating Strong Passwords:

### Characteristics of Strong Passwords:
- At least 12 characters long
- Mix of uppercase and lowercase letters
- Include numbers and special characters
- Avoid dictionary words
- Don''t use personal information

### Password Strategies:

**Passphrase Method:**
Create a sentence and use first letters:
"I love Bowie State University since 2020!" → IlBSUs2020!

**Random Generation:**
Use password managers to generate random passwords:
- LastPass
- 1Password
- Bitwarden
- Dashlane

## Password Don''ts:

❌ Never use:
- "password" or "123456"
- Your name or birthday
- Common words
- Keyboard patterns (qwerty)
- Same password across sites

## Multi-Factor Authentication (MFA):

### What is MFA?
Additional security layer beyond passwords:
1. Something you know (password)
2. Something you have (phone, token)
3. Something you are (fingerprint, face)

### MFA Methods:
- SMS codes
- Authenticator apps (Google Authenticator, Microsoft Authenticator)
- Hardware tokens
- Biometric verification

### Enable MFA on:
- Email accounts
- Banking apps
- Social media
- Bowie State portal
- Cloud storage

## Password Management:

### Using Password Managers:
Benefits:
- Store all passwords securely
- Generate strong passwords
- Auto-fill login forms
- Sync across devices
- Secure password sharing

### Password Hygiene:
- Change passwords if breach suspected
- Don''t share passwords
- Use different passwords for different accounts
- Review and update old passwords
- Enable breach notifications

## Bowie State Requirements:

Your Bowie State password must:
- Be at least 8 characters
- Include uppercase and lowercase
- Contain at least one number
- Change every 90 days
- Not reuse last 5 passwords

Enable MFA on your Bowie State account:
1. Log into portal
2. Go to Security Settings
3. Enable Two-Factor Authentication
4. Scan QR code with authenticator app',
'password_security', 'beginner', 25,
'[
  {
    "question": "What makes a password strong?",
    "options": ["Your birthday", "At least 12 characters with mixed types", "Your pet name", "A dictionary word"],
    "correct": 1
  },
  {
    "question": "What is Multi-Factor Authentication?",
    "options": ["Using multiple passwords", "Additional security beyond password", "Changing password often", "Sharing passwords"],
    "correct": 1
  },
  {
    "question": "Should you use the same password for multiple accounts?",
    "options": ["Yes, easier to remember", "No, each account needs unique password", "Only for unimportant accounts", "Yes, if it is strong"],
    "correct": 1
  }
]'::jsonb),

('Mobile Device Security', 
'Secure your smartphone and tablet from phishing and malware attacks.',
'# Mobile Security

Mobile devices are prime targets for phishing attacks due to smaller screens and constant connectivity.

## Mobile-Specific Threats:

### 1. Smishing (SMS Phishing)
- Fake delivery notifications
- Bank security alerts
- Prize winnings
- Urgent account verifications

### 2. Malicious Apps
- Fake banking apps
- Trojanized popular apps
- Apps requesting excessive permissions
- Unofficial app stores

### 3. Public WiFi Risks
- Man-in-the-middle attacks
- Fake WiFi hotspots
- Unencrypted connections
- Session hijacking

### 4. QR Code Scams
- Malicious QR codes
- Fake payment requests
- Phishing websites
- Malware downloads

## Protection Measures:

### Device Security:
- Enable screen lock (PIN, pattern, biometric)
- Keep OS and apps updated
- Enable remote wipe capability
- Use device encryption
- Install from official app stores only

### App Permissions:
Review and limit:
- Location access
- Camera and microphone
- Contacts and messages
- Storage access
- Background data usage

### Network Security:
- Avoid public WiFi for sensitive tasks
- Use VPN on public networks
- Disable auto-connect to WiFi
- Turn off Bluetooth when not needed
- Verify WiFi network names

### Safe Browsing:
- Look for HTTPS in URLs
- Be cautious of pop-ups
- Don''t download from untrusted sources
- Clear browser cache regularly
- Use mobile security apps

## Bowie State Mobile Security:

### Official Bowie State Apps:
- Bowie State Mobile (official)
- Canvas Student
- Blackboard Mobile
- Microsoft Authenticator (for MFA)

### Campus WiFi:
- Connect to "BowieState-Secure"
- Avoid "BowieState-Guest" for sensitive tasks
- Never connect to unknown networks
- Report suspicious WiFi networks to IT

### Lost or Stolen Device:
1. Contact Campus Police: 301-860-4040
2. Use Find My Device (Android) or Find My iPhone
3. Change passwords immediately
4. Report to IT Department
5. File police report if stolen',
'mobile_security', 'intermediate', 22,
'[
  {
    "question": "What is smishing?",
    "options": ["Email phishing", "SMS/text phishing", "Voice phishing", "Social media phishing"],
    "correct": 1
  },
  {
    "question": "Should you use public WiFi for banking?",
    "options": ["Yes, it is convenient", "No, unless using VPN", "Yes, if password protected", "Only on weekends"],
    "correct": 1
  },
  {
    "question": "Where should you download mobile apps?",
    "options": ["Any website", "Official app stores only", "Email attachments", "Text message links"],
    "correct": 1
  }
]'::jsonb),

('Reporting and Response', 
'Learn the proper procedures for reporting phishing attempts and security incidents.',
'# Incident Reporting and Response

Quick and proper reporting of phishing attempts protects the entire Bowie State community.

## When to Report:

Report immediately if you:
- Receive suspicious emails
- Click on a phishing link
- Provide credentials to fake site
- Download suspicious attachments
- Notice unusual account activity
- Receive threatening messages

## How to Report at Bowie State:

### 1. Report Phishing Emails:
**Method 1: Email**
- Forward to: security@bowie.edu
- Include full email headers
- Don''t modify the original email

**Method 2: GUARDBULLDOG Portal**
- Log into https://guardbulldog.bowie.edu
- Click "Report Incident"
- Fill out detailed form
- Upload screenshots if available

**Method 3: Phone**
- IT Help Desk: 301-860-4357
- Campus Police (emergencies): 301-860-4040

### 2. Information to Include:
- Date and time received
- Sender information
- Subject line
- Full message content
- Any links or attachments
- Your actions (clicked, replied, etc.)

## If You Clicked a Phishing Link:

### Immediate Actions:
1. **Don''t panic** - quick action can prevent damage
2. **Disconnect from network** - prevent data theft
3. **Don''t delete** - preserve evidence
4. **Change passwords** - start with email and critical accounts
5. **Run antivirus scan** - check for malware
6. **Report immediately** - contact IT Security

### Follow-up Steps:
- Monitor accounts for suspicious activity
- Enable account alerts
- Review recent transactions
- Check for unauthorized access
- Update security questions
- Enable MFA if not already active

## If You Provided Credentials:

### Critical Steps (within 1 hour):
1. Change password immediately
2. Check account activity logs
3. Review connected devices
4. Revoke suspicious sessions
5. Enable MFA
6. Report to IT Security

### Monitor for:
- Unauthorized emails sent
- Changed account settings
- New devices logged in
- Suspicious file access
- Account lockouts

## Campus-Wide Response:

### When You Report:
1. IT Security investigates
2. Threat is analyzed
3. Campus alert issued if widespread
4. Blocklists updated
5. Similar emails quarantined
6. Community educated

### Your Role:
- Report promptly
- Provide accurate information
- Follow IT guidance
- Educate peers
- Stay informed about threats

## Prevention After Incident:

### Learn from Experience:
- Review what happened
- Identify red flags missed
- Complete security training
- Share lessons learned
- Update security practices

### Strengthen Security:
- Use password manager
- Enable MFA everywhere
- Update recovery information
- Review privacy settings
- Install security updates

## Resources:

### Bowie State Contacts:
- **IT Security**: security@bowie.edu
- **IT Help Desk**: 301-860-4357
- **Campus Police**: 301-860-4040
- **GUARDBULLDOG**: https://guardbulldog.bowie.edu

### External Resources:
- **FBI IC3**: www.ic3.gov
- **FTC**: www.ftc.gov/complaint
- **Anti-Phishing Working Group**: www.apwg.org

Remember: Reporting helps protect everyone!',
'incident_response', 'advanced', 30,
'[
  {
    "question": "What should you do first if you click a phishing link?",
    "options": ["Delete the email", "Disconnect from network", "Reply to sender", "Restart computer"],
    "correct": 1
  },
  {
    "question": "Where should Bowie State students report phishing?",
    "options": ["Local police only", "security@bowie.edu or GUARDBULLDOG portal", "Social media", "Ignore it"],
    "correct": 1
  },
  {
    "question": "If you provided credentials to a phishing site, what is most urgent?",
    "options": ["Delete your account", "Change password immediately", "Wait and see", "Tell friends"],
    "correct": 1
  }
]'::jsonb);

-- Insert User Progress (some students completed modules)
INSERT INTO user_progress (user_id, module_id, completed, score, completed_at) VALUES
(7, 1, TRUE, 100, NOW() - INTERVAL '5 days'),
(7, 2, TRUE, 85, NOW() - INTERVAL '3 days'),
(7, 4, TRUE, 90, NOW() - INTERVAL '1 day'),
(8, 1, TRUE, 95, NOW() - INTERVAL '4 days'),
(8, 2, FALSE, NULL, NULL),
(9, 1, TRUE, 80, NOW() - INTERVAL '6 days'),
(10, 1, TRUE, 100, NOW() - INTERVAL '2 days'),
(10, 2, TRUE, 75, NOW() - INTERVAL '1 day'),
(11, 1, FALSE, NULL, NULL),
(12, 1, TRUE, 90, NOW() - INTERVAL '3 days');

-- Insert Audit Logs
INSERT INTO audit_logs (user_id, action, details, ip_address) VALUES
(1, 'LOGIN', 'Super admin logged in', '192.168.1.100'),
(2, 'REPORT_REVIEWED', 'Reviewed report #1 - Fake IT Department Password Reset', '192.168.1.101'),
(2, 'ALERT_SENT', 'Sent campus-wide phishing alert', '192.168.1.101'),
(7, 'REPORT_SUBMITTED', 'Submitted phishing report', '10.0.0.45'),
(8, 'MODULE_COMPLETED', 'Completed Introduction to Phishing module', '10.0.0.46'),
(3, 'USER_ROLE_UPDATED', 'Updated user role for student ID 10', '192.168.1.102'),
(9, 'PASSWORD_CHANGED', 'User changed password', '10.0.0.47'),
(2, 'REPORT_STATUS_UPDATED', 'Changed report #2 status to resolved', '192.168.1.101');

-- Create indexes for better performance
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_severity ON reports(severity);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Grant permissions (adjust as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_database_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_database_user;

-- ========================================
-- SETUP COMPLETE
-- ========================================
-- Database is now populated with:
-- - 12 Users (1 super admin, 2 admins, 3 faculty, 6 students)
-- - 10 Phishing Reports (various categories and severities)
-- - 7 Report Notes (admin responses)
-- - 6 Education Modules (comprehensive training content)
-- - 10 User Progress Records (student training completion)
-- - 8 Audit Logs (system activity tracking)
