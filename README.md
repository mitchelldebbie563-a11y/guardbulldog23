# 🛡️ GUARDBULLDOG - Phishing Awareness & Reporting System

**A comprehensive cybersecurity platform for Bowie State University to combat phishing attacks through education, reporting, and real-time threat analysis.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue.svg)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)

---

## 👥 Development Team

- **Ashleigh Mosley** - System Project Manager
- **Amanda B** - System Designer/Architect/Engineer
- **Enrique Wallace** - System Implementator
- **Moustapha** - System Analyst and Tester
- **Victory Ubogu** - System Developer

---

## ✨ Features

### 🔐 Authentication & Authorization
- ✅ Secure JWT-based authentication
- ✅ Role-based access control (User, Admin, Super Admin)
- ✅ Password hashing with bcrypt
- ✅ Email validation (Bowie State domains only)
- ✅ Profile management

### 📧 Phishing Report Management
- ✅ Submit phishing reports with attachments
- ✅ Track report status (Pending, Investigating, Resolved)
- ✅ Admin review and notes system
- ✅ Trending threats analysis
- ✅ Report categorization (Phishing, Spam, Malware)

### 👑 Admin Dashboard
- ✅ Real-time statistics and analytics
- ✅ User management and role assignment
- ✅ Bulk report operations
- ✅ System health monitoring
- ✅ Comprehensive reporting tools

### 🔒 Security Features
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Secure file uploads

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

### Frontend
- **React 18** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

---

## 🚀 Quick Start

### Prerequisites
- Node.js v14 or higher
- PostgreSQL v12 or higher
- npm or yarn

### Installation

#### Option 1: Automated Setup (Windows)
```bash
QUICKSTART.bat
```

#### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Configure environment**
   ```bash
   copy .env.example .env
   # Edit .env with your database credentials
   ```

3. **Setup database**
   ```bash
   createdb guardbulldog
   npm run seed
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

---

## 📚 Documentation

- **[Complete Setup Guide](SETUP_COMPLETE.md)** - Detailed installation
- **[API Testing Guide](API_TESTING.md)** - Test all endpoints
- **[Development Overview](DEVELOPMENT_OVERVIEW.md)** - Architecture details

---

## 👥 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | admin@bowie.edu | Admin123! |
| **Admin** | security@bowie.edu | Security123! |
| **Student** | student@bowie.edu | Student123! |
| **Faculty** | faculty@bowie.edu | Faculty123! |

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Reports
- `POST /api/reports/submit` - Submit phishing report
- `GET /api/reports/user` - Get user's reports
- `GET /api/reports/:id` - Get report details
- `GET /api/reports/trending` - Get trending threats
- `PUT /api/reports/:id/status` - Update status (Admin)
- `POST /api/reports/:id/notes` - Add note (Admin)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/reports` - All reports with filters
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/reports/bulk` - Bulk update
- `GET /api/admin/system/health` - System health

**See [API_TESTING.md](API_TESTING.md) for detailed examples**

---

## 📁 Project Structure

```
GUARDBULLDOG/
├── server/                    # Backend application
│   ├── config/               # Database configuration
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── scripts/             # Utility scripts
│   └── index.js             # Server entry point
│
├── client/                   # Frontend application
│   └── src/
│       ├── components/      # Reusable components
│       ├── pages/           # Page components
│       ├── contexts/        # React contexts
│       └── utils/           # Utility functions
│
├── uploads/                 # File upload directory
├── .env.example            # Environment template
├── QUICKSTART.bat          # Windows setup script
└── README.md               # This file
```

---

## 🗄️ Database Schema

### Tables
- **users** - User accounts and authentication
- **reports** - Phishing reports
- **report_notes** - Admin notes on reports
- **education_modules** - Learning content
- **user_progress** - Learning progress tracking
- **audit_logs** - System activity logs

**All tables are created automatically on first run**

---

## 🚀 Deployment

### Heroku
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set JWT_SECRET=your_secret
git push heroku main
heroku run npm run seed
```

---

## 🧪 Testing

```bash
# Test API health
curl http://localhost:5000/api/health

# Run with demo data
npm run seed
```

---

## 🔐 Security

- JWT tokens with 7-day expiration
- Bcrypt password hashing (12 rounds)
- CORS protection
- Helmet.js security headers
- SQL injection prevention
- XSS protection
- File upload validation

---

## 📝 License

This project is licensed under the MIT License.

---

## 📞 Support

For issues or questions:
1. Check the [documentation](#-documentation)
2. Review [API Testing Guide](API_TESTING.md)
3. Contact the development team

---

**🎉 GUARDBULLDOG is fully functional and ready for production use!**

**Made with ❤️ by the Bowie State University Cybersecurity Team**
