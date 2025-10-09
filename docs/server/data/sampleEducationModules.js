// Sample education modules for GUARDBULLDOG
// This file contains sample educational content to populate the database

const sampleModules = [
  {
    title: "Email Security Basics",
    description: "Learn the fundamentals of email security and common threats that target university students and staff.",
    category: "basics",
    difficulty: "beginner",
    estimatedTime: 15,
    content: {
      sections: [
        {
          title: "Introduction to Email Security",
          content: `Email is one of the most common attack vectors used by cybercriminals. Understanding basic email security principles is crucial for protecting yourself and the university community.

Key concepts covered in this module:
• What makes emails vulnerable to attacks
• Common types of email-based threats
• Basic security practices for email usage
• How to identify suspicious emails

Email security is everyone's responsibility. By learning these fundamentals, you become part of Bowie State University's defense against cyber threats.`,
          type: "text",
          order: 1
        },
        {
          title: "Types of Email Threats",
          content: `There are several types of threats that commonly target email users:

1. **Phishing Emails**
   - Attempt to steal personal information
   - Often impersonate trusted organizations
   - May contain malicious links or attachments

2. **Spam**
   - Unwanted bulk emails
   - Can contain malicious content
   - Often used to distribute other threats

3. **Malware Distribution**
   - Emails containing malicious attachments
   - Can infect your computer when opened
   - May steal data or damage systems

4. **Business Email Compromise (BEC)**
   - Targets organizations and employees
   - Often involves impersonation of executives
   - Aims to steal money or sensitive information

Understanding these threats is the first step in protecting yourself and the university.`,
          type: "text",
          order: 2
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "What is the most common attack vector used by cybercriminals?",
          type: "multiple_choice",
          options: ["Social media", "Email", "Phone calls", "Text messages"],
          correctAnswer: "Email",
          explanation: "Email is the most common attack vector because it's widely used and can easily be manipulated to appear legitimate.",
          points: 1
        },
        {
          question: "Phishing emails always contain malicious attachments.",
          type: "true_false",
          correctAnswer: "false",
          explanation: "Phishing emails may contain malicious links, request personal information, or use social engineering without necessarily including attachments.",
          points: 1
        },
        {
          question: "Which type of attack specifically targets organizations by impersonating executives?",
          type: "multiple_choice",
          options: ["Spam", "Phishing", "Business Email Compromise", "Malware"],
          correctAnswer: "Business Email Compromise",
          explanation: "Business Email Compromise (BEC) attacks often involve impersonating company executives to trick employees into transferring money or revealing sensitive information.",
          points: 1
        }
      ],
      passingScore: 70,
      maxAttempts: 3
    },
    examples: [
      {
        title: "Fake Bank Security Alert",
        description: "A common phishing attempt that impersonates a bank security department.",
        emailExample: {
          subject: "URGENT: Suspicious Activity Detected on Your Account",
          sender: "security@bankofamerica-alerts.com",
          content: `Dear Valued Customer,

We have detected suspicious activity on your account. For your security, we have temporarily limited access to your account.

To restore full access, please verify your identity by clicking the link below and entering your login credentials:

[Verify Account Now - http://bankofamerica-secure.verification-center.com]

This verification must be completed within 24 hours or your account will be permanently suspended.

Thank you for your immediate attention to this matter.

Bank of America Security Team`
        },
        indicators: [
          "Urgent language creating false time pressure",
          "Suspicious sender domain (not official Bank of America)",
          "Request for login credentials via email",
          "Threatening account suspension",
          "Generic greeting instead of personalized"
        ],
        riskLevel: "high"
      }
    ],
    tags: ["email", "security", "basics", "phishing"],
    isActive: true
  },
  {
    title: "Identifying Phishing Emails",
    description: "Learn to recognize the telltale signs of phishing attempts and protect yourself from credential theft.",
    category: "identification",
    difficulty: "beginner",
    estimatedTime: 20,
    content: {
      sections: [
        {
          title: "What is Phishing?",
          content: `Phishing is a type of cyber attack where criminals impersonate legitimate organizations to steal personal information, passwords, or financial data.

**How Phishing Works:**
1. Attackers send emails that appear to be from trusted sources
2. These emails contain urgent requests or warnings
3. Recipients are directed to fake websites or asked to provide information
4. Stolen information is used for identity theft or financial fraud

**Why Phishing is Effective:**
• Emails can look very convincing
• People trust familiar brands and organizations
• Urgency and fear motivate quick action
• Many people don't know what to look for

The good news is that with proper training, phishing emails become much easier to spot.`,
          type: "text",
          order: 1
        },
        {
          title: "Red Flags to Watch For",
          content: `Learn to identify these common warning signs:

**Sender Red Flags:**
• Email address doesn't match the organization
• Misspellings in the domain name
• Generic or suspicious sender names
• Unexpected emails from known contacts

**Content Red Flags:**
• Urgent language ("Act now!", "Limited time!")
• Threats of account closure or suspension
• Requests for personal information via email
• Generic greetings ("Dear Customer")
• Poor grammar and spelling errors

**Link and Attachment Red Flags:**
• Suspicious URLs that don't match the organization
• Shortened links (bit.ly, tinyurl, etc.)
• Unexpected attachments
• Requests to download software

**Visual Red Flags:**
• Poor quality logos or images
• Inconsistent formatting
• Missing or incorrect contact information
• Unprofessional appearance

Remember: When in doubt, verify independently by contacting the organization directly.`,
          type: "text",
          order: 2
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "What is the primary goal of phishing attacks?",
          type: "multiple_choice",
          options: ["To send spam", "To steal personal information", "To crash computer systems", "To advertise products"],
          correctAnswer: "To steal personal information",
          explanation: "Phishing attacks are designed to steal personal information like passwords, credit card numbers, and other sensitive data.",
          points: 1
        },
        {
          question: "Which of these is a red flag in an email sender address?",
          type: "multiple_choice",
          options: ["@bowie.edu", "@bankofamerica.com", "@amazom.com", "@microsoft.com"],
          correctAnswer: "@amazom.com",
          explanation: "The misspelling 'amazom' instead of 'amazon' is a common tactic used by phishers to create fake domains that look legitimate.",
          points: 1
        },
        {
          question: "Legitimate organizations often request passwords via email.",
          type: "true_false",
          correctAnswer: "false",
          explanation: "Legitimate organizations will never ask for passwords, PINs, or other sensitive information via email.",
          points: 1
        },
        {
          question: "What should you do if you receive a suspicious email claiming to be from your bank?",
          type: "multiple_choice",
          options: ["Click the link to verify", "Reply with your information", "Contact the bank directly", "Forward it to friends"],
          correctAnswer: "Contact the bank directly",
          explanation: "Always verify suspicious emails by contacting the organization directly through official channels, not through the email itself.",
          points: 1
        }
      ],
      passingScore: 75,
      maxAttempts: 3
    },
    examples: [
      {
        title: "Fake Microsoft Security Alert",
        description: "A phishing email impersonating Microsoft with urgent security warnings.",
        emailExample: {
          subject: "Microsoft Security Alert: Unusual Sign-in Activity",
          sender: "security-noreply@microsoft-alerts.net",
          content: `Microsoft Security Team

We detected unusual sign-in activity on your Microsoft account from an unrecognized device.

Location: Lagos, Nigeria
Device: Unknown Android Device
Time: Today at 3:47 AM

If this wasn't you, your account may be compromised. Secure your account immediately:

[Secure My Account] - http://microsoft-security.verification-portal.net

If you don't take action within 2 hours, we'll be forced to suspend your account to prevent unauthorized access.

Microsoft Security Team
This is an automated message. Please do not reply.`
        },
        indicators: [
          "Suspicious domain (microsoft-alerts.net instead of microsoft.com)",
          "Creates urgency with 2-hour deadline",
          "Vague location information",
          "Requests immediate action through external link",
          "Threatens account suspension"
        ],
        riskLevel: "high"
      },
      {
        title: "Fake University IT Support",
        description: "A phishing attempt targeting university students and staff.",
        emailExample: {
          subject: "Action Required: Email Account Verification",
          sender: "it-support@bowie-university.edu",
          content: `Dear Bowie State Student/Staff,

Our system has detected that your email account requires immediate verification to prevent service interruption.

Due to recent security updates, all users must verify their email credentials within 48 hours.

Please click here to verify your account: [Verify Email Account]

Failure to complete verification will result in:
- Loss of email access
- Inability to access online services
- Account deactivation

Complete verification now to avoid service disruption.

Bowie State IT Support Team`
        },
        indicators: [
          "Incorrect domain (bowie-university.edu vs bowie.edu)",
          "Generic greeting instead of personalized",
          "Urgent verification requirement",
          "Threatens service loss",
          "Requests credential verification via email"
        ],
        riskLevel: "critical"
      }
    ],
    tags: ["phishing", "identification", "security", "awareness"],
    isActive: true
  },
  {
    title: "Safe Email Practices",
    description: "Learn best practices for secure email usage and how to protect yourself from email-based threats.",
    category: "prevention",
    difficulty: "intermediate",
    estimatedTime: 25,
    content: {
      sections: [
        {
          title: "Email Security Best Practices",
          content: `Follow these essential practices to keep your email secure:

**Before Opening Emails:**
• Check the sender's address carefully
• Look for spelling errors in the subject line
• Be suspicious of unexpected emails
• Verify urgent requests through other channels

**When Reading Emails:**
• Don't click links immediately
• Hover over links to see the actual destination
• Be cautious of attachments from unknown senders
• Look for signs of phishing (urgency, threats, requests for info)

**Protecting Your Information:**
• Never share passwords via email
• Don't provide personal information in response to emails
• Use strong, unique passwords for your email account
• Enable two-factor authentication when available

**Reporting Suspicious Activity:**
• Report phishing attempts to IT security
• Don't forward suspicious emails to others
• Use the GUARDBULLDOG reporting system
• Help protect the university community`,
          type: "text",
          order: 1
        },
        {
          title: "Link and Attachment Safety",
          content: `Links and attachments are common attack vectors. Here's how to handle them safely:

**Link Safety:**
• Hover over links to preview the destination
• Look for suspicious URLs or misspellings
• Be wary of shortened links (bit.ly, tinyurl)
• When in doubt, navigate to the site directly

**Attachment Safety:**
• Only open attachments you're expecting
• Be cautious of executable files (.exe, .bat, .scr)
• Scan attachments with antivirus software
• Verify unexpected attachments with the sender

**Safe Browsing:**
• Look for HTTPS (secure) connections
• Check for valid security certificates
• Be cautious on unfamiliar websites
• Don't enter sensitive information on suspicious sites

**Mobile Email Safety:**
• Be extra cautious on mobile devices
• Links may be harder to verify on small screens
• Use official apps when possible
• Keep your mobile email app updated

Remember: It's better to be overly cautious than to fall victim to an attack.`,
          type: "text",
          order: 2
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "What should you do before clicking a link in an email?",
          type: "multiple_choice",
          options: ["Click it immediately", "Hover over it to see the destination", "Reply to the sender", "Forward the email"],
          correctAnswer: "Hover over it to see the destination",
          explanation: "Hovering over links allows you to see the actual destination URL before clicking, helping you identify suspicious or malicious links.",
          points: 1
        },
        {
          question: "Which file types are generally considered high-risk for email attachments?",
          type: "multiple_choice",
          options: [".pdf and .docx", ".jpg and .png", ".exe and .bat", ".txt and .csv"],
          correctAnswer: ".exe and .bat",
          explanation: "Executable files like .exe and .bat can run programs on your computer and are commonly used to distribute malware.",
          points: 1
        },
        {
          question: "It's safe to provide your password in response to an email request if it appears to be from IT support.",
          type: "true_false",
          correctAnswer: "false",
          explanation: "Legitimate IT support will never ask for your password via email. Always verify such requests through official channels.",
          points: 1
        },
        {
          question: "What does HTTPS indicate about a website?",
          type: "multiple_choice",
          options: ["It's a government site", "It has a secure connection", "It's free to use", "It's mobile-friendly"],
          correctAnswer: "It has a secure connection",
          explanation: "HTTPS indicates that the connection between your browser and the website is encrypted and secure.",
          points: 1
        }
      ],
      passingScore: 75,
      maxAttempts: 3
    },
    examples: [
      {
        title: "Suspicious Link Example",
        description: "An example of how malicious links can be disguised in emails.",
        emailExample: {
          subject: "Your Package Delivery Update",
          sender: "delivery@fedex-tracking.com",
          content: `Dear Customer,

Your package delivery has been delayed due to an incorrect address.

To update your delivery information and reschedule delivery, please click the link below:

Track Your Package: https://fedex-package-tracking.secure-delivery.net/update

Package Details:
Tracking Number: 1234567890
Delivery Date: Pending Address Update

Please update your information within 24 hours to avoid return to sender.

FedEx Customer Service`
        },
        indicators: [
          "Suspicious domain (not official FedEx)",
          "Unexpected package notification",
          "Urgent action required",
          "Link leads to non-FedEx website",
          "Generic tracking number"
        ],
        riskLevel: "medium"
      }
    ],
    tags: ["prevention", "best-practices", "links", "attachments"],
    isActive: true
  }
];

module.exports = sampleModules;
