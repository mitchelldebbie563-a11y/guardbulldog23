# GUARDBULLDOG - Phishing Awareness & Reporting System

A comprehensive cybersecurity platform designed for Bowie State University to combat phishing attacks through education and incident reporting.

## Project Overview

GUARDBULLDOG aims to:
- **Educate** the university community about phishing threats
- **Provide** an easy-to-use reporting system for suspicious emails
- **Track** phishing incidents to improve cybersecurity measures

## Team Members

- **Ashleigh Mosley** - System Project Manager
- **Amanda B** - System Designer/Architect/Engineer
- **Enrique Wallace** - System Implementator
- **Moustapha** - System Analyst and Tester
- **Victory Ubogu** - System Developer

## Technology Stack

- **Frontend**: React.js with modern UI components
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Security**: Helmet.js, rate limiting, input validation

## Features

### Core Features
- User authentication and role-based access
- Phishing email reporting system
- Educational content management
- Admin dashboard for incident tracking
- Email analysis and categorization
- Reporting and analytics

### Security Features
- Secure file upload handling
- Input validation and sanitization
- Rate limiting to prevent abuse
- Encrypted password storage
- Session management

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
GUARDBULLDOG/
├── client/                 # React frontend
├── server/                 # Express backend
├── docs/                   # Documentation
├── tests/                  # Test files
└── README.md
```

## Contributing

This project is developed by the GUARDBULLDOG team at Bowie State University. Please follow the established coding standards and testing procedures.

## License

MIT License - See LICENSE file for details.
