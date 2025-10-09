// Sample phishing examples for GUARDBULLDOG
// This file contains realistic phishing examples for educational purposes

const samplePhishingExamples = [
  {
    title: "Fake Banking Security Alert",
    category: "financial",
    riskLevel: "critical",
    description: "A sophisticated phishing attempt impersonating a major bank's security department.",
    emailExample: {
      subject: "URGENT: Suspicious Activity Detected - Verify Account Immediately",
      sender: "security-alerts@chase-bank-security.com",
      receivedDate: "2024-01-15T09:30:00Z",
      content: `Dear Valued Chase Customer,

Our fraud detection system has identified unusual activity on your account that requires immediate attention.

SUSPICIOUS ACTIVITY DETECTED:
- Location: Lagos, Nigeria
- Amount: $2,847.00
- Transaction Type: Wire Transfer
- Time: Today at 6:23 AM EST

To protect your account, we have temporarily restricted access. You must verify your identity within 2 hours or your account will be permanently suspended.

VERIFY YOUR ACCOUNT NOW: [Click Here to Secure Account]
https://chase-security-verification.account-protection.net/verify

If you do not recognize this activity, please contact us immediately at 1-800-CHASE-FRAUD.

Thank you for banking with Chase.

Chase Bank Security Team
Member FDIC`,
      attachments: []
    },
    phishingIndicators: [
      {
        indicator: "Suspicious sender domain",
        description: "Domain 'chase-bank-security.com' is not Chase's official domain (should be chase.com)",
        severity: "high"
      },
      {
        indicator: "Urgent time pressure",
        description: "Creates false urgency with 2-hour deadline to pressure quick action",
        severity: "high"
      },
      {
        indicator: "Suspicious verification link",
        description: "Link leads to non-Chase domain 'account-protection.net'",
        severity: "critical"
      },
      {
        indicator: "Generic greeting",
        description: "Uses 'Dear Valued Customer' instead of actual name",
        severity: "medium"
      },
      {
        indicator: "Threatening language",
        description: "Threatens permanent account suspension to create fear",
        severity: "high"
      }
    ],
    educationalNotes: "This is a classic phishing attempt that combines urgency, fear, and impersonation. Real banks will never ask you to verify account information via email links.",
    reportedCount: 247,
    tags: ["banking", "financial", "impersonation", "urgent", "credential-theft"]
  },
  {
    title: "Fake University IT Password Reset",
    category: "educational",
    riskLevel: "high",
    description: "Phishing attempt targeting university students and staff by impersonating IT support.",
    emailExample: {
      subject: "Action Required: Password Expiration Notice - Bowie State University",
      sender: "it-support@bowie-state-university.edu",
      receivedDate: "2024-01-10T14:15:00Z",
      content: `Bowie State University IT Department

Dear Student/Faculty Member,

This is an automated notification that your university email password will expire in 24 hours due to our new security policy updates.

To prevent service interruption and maintain access to:
• Email services
• Blackboard learning system
• Student/Faculty portals
• Library resources

You must update your password immediately using our secure verification system.

UPDATE PASSWORD NOW: [Secure Password Update Portal]
https://bowie-state-password-reset.university-services.org/update

Your current login credentials will be required to complete this process.

Failure to update within 24 hours will result in:
- Complete loss of email access
- Inability to access online courses
- Suspension of university services

For technical support, contact IT Help Desk at (301) 860-HELP

Bowie State University IT Department
Information Technology Services`,
      attachments: []
    },
    phishingIndicators: [
      {
        indicator: "Incorrect domain name",
        description: "Uses 'bowie-state-university.edu' instead of official 'bowie.edu'",
        severity: "critical"
      },
      {
        indicator: "Password expiration scam",
        description: "Creates false urgency about password expiration",
        severity: "high"
      },
      {
        indicator: "External verification link",
        description: "Links to 'university-services.org' which is not a Bowie State domain",
        severity: "critical"
      },
      {
        indicator: "Credential harvesting attempt",
        description: "Requests current login credentials for 'verification'",
        severity: "critical"
      },
      {
        indicator: "Service suspension threats",
        description: "Threatens loss of multiple university services",
        severity: "medium"
      }
    ],
    educationalNotes: "University IT departments will never ask for passwords via email. Always verify such requests by contacting IT directly through official channels.",
    reportedCount: 89,
    tags: ["university", "educational", "password", "it-support", "credential-theft"]
  },
  {
    title: "Fake Microsoft 365 Security Alert",
    category: "technology",
    riskLevel: "high",
    description: "Phishing email impersonating Microsoft with fake security warnings.",
    emailExample: {
      subject: "Microsoft Security Alert: Unusual Sign-in Activity Detected",
      sender: "security-noreply@microsoft-security-alerts.com",
      receivedDate: "2024-01-12T11:45:00Z",
      content: `Microsoft Security Center

We detected unusual sign-in activity on your Microsoft account that requires immediate attention.

SECURITY ALERT DETAILS:
Account: your-email@bowie.edu
Suspicious Location: Moscow, Russia
Device: Unknown Windows PC
Time: January 12, 2024 at 8:30 AM EST
IP Address: 185.220.101.42

If this sign-in attempt was not authorized by you, your account may be compromised. Immediate action is required to secure your account.

SECURE YOUR ACCOUNT: [Verify Account Security]
https://microsoft-account-security.verification-portal.net/secure

What happens if you don't take action:
• Unauthorized access to your files and emails
• Potential data theft or loss
• Account may be used for malicious activities
• Loss of access to Microsoft services

This security alert will expire in 2 hours. After that, we cannot guarantee account protection.

Microsoft Security Team
This is an automated security message. Please do not reply to this email.`,
      attachments: []
    },
    phishingIndicators: [
      {
        indicator: "Fake Microsoft domain",
        description: "Uses 'microsoft-security-alerts.com' instead of official Microsoft domains",
        severity: "critical"
      },
      {
        indicator: "Suspicious sign-in location",
        description: "Claims sign-in from high-risk location to create alarm",
        severity: "medium"
      },
      {
        indicator: "External security link",
        description: "Verification link leads to non-Microsoft domain",
        severity: "critical"
      },
      {
        indicator: "Time pressure tactics",
        description: "Creates false 2-hour deadline for action",
        severity: "high"
      },
      {
        indicator: "Fear-based messaging",
        description: "Uses scare tactics about data theft and account compromise",
        severity: "medium"
      }
    ],
    educationalNotes: "Microsoft will never ask you to verify your account through external links in emails. Always sign in directly to your Microsoft account to check for real security alerts.",
    reportedCount: 156,
    tags: ["microsoft", "technology", "security-alert", "account-compromise", "credential-theft"]
  },
  {
    title: "Fake Package Delivery Notification",
    category: "delivery",
    riskLevel: "medium",
    description: "Phishing attempt using fake shipping notifications to steal personal information.",
    emailExample: {
      subject: "Package Delivery Failed - Action Required",
      sender: "delivery-notifications@fedex-shipping.net",
      receivedDate: "2024-01-08T16:20:00Z",
      content: `FedEx Delivery Service

Dear Customer,

We attempted to deliver your package but were unable to complete delivery due to an incomplete address.

PACKAGE DETAILS:
Tracking Number: FX7849562341
Sender: Amazon.com
Package Weight: 2.3 lbs
Delivery Attempts: 3
Status: Pending Address Verification

To reschedule delivery and update your address information, please use our online portal:

RESCHEDULE DELIVERY: [Update Delivery Information]
https://fedex-package-redelivery.shipping-services.net/update

Required information for redelivery:
• Full name and address confirmation
• Phone number for delivery coordination
• Preferred delivery time

If you do not update your information within 5 business days, your package will be returned to sender.

For questions, contact FedEx Customer Service at 1-800-GO-FEDEX.

FedEx Ground Delivery Team`,
      attachments: []
    },
    phishingIndicators: [
      {
        indicator: "Suspicious FedEx domain",
        description: "Uses 'fedex-shipping.net' instead of official 'fedex.com'",
        severity: "high"
      },
      {
        indicator: "Unexpected package notification",
        description: "Recipient may not be expecting any packages",
        severity: "medium"
      },
      {
        indicator: "External delivery portal",
        description: "Links to non-FedEx domain for 'address update'",
        severity: "high"
      },
      {
        indicator: "Personal information request",
        description: "Asks for full name, address, and phone number",
        severity: "high"
      },
      {
        indicator: "Generic tracking number",
        description: "Tracking number format may not match real FedEx format",
        severity: "low"
      }
    ],
    educationalNotes: "Legitimate shipping companies will not ask you to update personal information via email links. Always track packages directly on the official company website.",
    reportedCount: 203,
    tags: ["delivery", "shipping", "fedex", "personal-info", "package-scam"]
  },
  {
    title: "Fake IRS Tax Notice",
    category: "government",
    riskLevel: "critical",
    description: "Sophisticated phishing attempt impersonating the Internal Revenue Service.",
    emailExample: {
      subject: "NOTICE: Immediate Action Required - Tax Refund Processing Error",
      sender: "notices@irs-treasury-gov.org",
      receivedDate: "2024-01-20T10:00:00Z",
      content: `Internal Revenue Service
United States Department of Treasury

OFFICIAL TAX NOTICE - CP2000

Taxpayer ID: [Your SSN]
Notice Date: January 20, 2024
Tax Year: 2023

URGENT: We have identified a processing error with your tax refund that requires immediate correction.

ERROR DETAILS:
• Refund Amount: $2,847.00
• Error Code: REF-2024-0847
• Processing Status: SUSPENDED

Due to recent changes in tax law and security protocols, you must verify your identity and banking information to release your refund.

VERIFY AND CLAIM REFUND: [IRS Secure Verification Portal]
https://irs-refund-verification.treasury-services.gov/verify

Required verification documents:
• Social Security Number
• Banking information for direct deposit
• Previous year tax return information
• Photo identification

Failure to complete verification within 72 hours will result in forfeiture of your refund amount.

For assistance, call the IRS Taxpayer Assistance Line at 1-800-829-1040.

Internal Revenue Service
U.S. Department of Treasury`,
      attachments: []
    },
    phishingIndicators: [
      {
        indicator: "Fake IRS domain",
        description: "Uses 'irs-treasury-gov.org' instead of official 'irs.gov'",
        severity: "critical"
      },
      {
        indicator: "Refund processing scam",
        description: "Creates false urgency about refund processing errors",
        severity: "high"
      },
      {
        indicator: "SSN and banking info request",
        description: "Requests highly sensitive personal and financial information",
        severity: "critical"
      },
      {
        indicator: "External verification portal",
        description: "Links to non-government domain for 'verification'",
        severity: "critical"
      },
      {
        indicator: "Forfeiture threat",
        description: "Threatens loss of refund to pressure quick action",
        severity: "high"
      }
    ],
    educationalNotes: "The IRS will never initiate contact via email about refunds or request sensitive information through email links. All legitimate IRS communications come via postal mail.",
    reportedCount: 312,
    tags: ["irs", "government", "tax-scam", "refund", "identity-theft"]
  }
];

module.exports = samplePhishingExamples;
