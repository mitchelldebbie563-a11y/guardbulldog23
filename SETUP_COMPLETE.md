# GUARDBULLDOG - Complete Setup Guide

## 🎯 Overview
GUARDBULLDOG is now fully configured with:
- ✅ PostgreSQL Database Integration
- ✅ Complete Authentication System
- ✅ Reports Management System
- ✅ Admin Dashboard APIs
- ✅ User Management
- ✅ File Upload Support
- ✅ Seed Data for Testing

---

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **PostgreSQL** (v12 or higher)
3. **npm** or **yarn**

---

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### Step 2: Database Setup

#### Option A: Local PostgreSQL

1. **Install PostgreSQL** (if not already installed)
   - Windows: Download from https://www.postgresql.org/download/windows/
   - Mac: `brew install postgresql`
   - Linux: `sudo apt-get install postgresql`

2. **Create Database**
   ```bash
   # Login to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE guardbulldog;
   
   # Exit
   \q
   ```

#### Option B: Cloud Database (Recommended for Production)

Use a cloud PostgreSQL service like:
- **Heroku Postgres** (Free tier available)
- **ElephantSQL** (Free tier available)
- **Supabase** (Free tier available)
- **AWS RDS**
- **Google Cloud SQL**

### Step 3: Environment Configuration

1. **Copy the example environment file:**
   ```bash
   copy .env.example .env
   ```

2. **Edit `.env` file with your configuration:**

   ```env
   # Database Configuration
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/guardbulldog
   
   # JWT Secret (generate a random string)
   JWT_SECRET=your_super_secure_random_string_at_least_32_characters_long
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Client URL
   CLIENT_URL=http://localhost:3000
   ```

   **To generate a secure JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### Step 4: Initialize Database

The database tables will be created automatically when you start the server. To also add demo data:

```bash
npm run seed
```

This will create:
- 4 demo user accounts
- Sample phishing reports
- Education modules

### Step 5: Start the Application

#### Development Mode (Both Server & Client):
```bash
npm run dev
```

#### Server Only:
```bash
npm run server
```

#### Client Only:
```bash
npm run client
```

#### Production Mode:
```bash
npm start
```

---

## 👥 Demo Accounts

After running the seed script, you can login with these accounts:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@bowie.edu | Admin123! |
| Admin | security@bowie.edu | Security123! |
| Student | student@bowie.edu | Student123! |
| Faculty | faculty@bowie.edu | Faculty123! |

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /verify` - Verify JWT token
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password

### Reports (`/api/reports`)
- `POST /submit` - Submit phishing report
- `GET /user` - Get user's reports
- `GET /trending` - Get trending threats
- `GET /:id` - Get report by ID
- `PUT /:id/status` - Update report status (Admin)
- `POST /:id/notes` - Add admin note (Admin)

### Admin (`/api/admin`)
- `GET /dashboard` - Get dashboard statistics
- `GET /reports` - Get all reports with filters
- `GET /users` - Get all users
- `PUT /users/:userId/role` - Update user role
- `PUT /reports/bulk` - Bulk update reports
- `GET /system/health` - Get system health

---

## 📁 Project Structure

```
GUARDBULLDOG/
├── server/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── auth.js            # Authentication logic
│   │   ├── reports.js         # Reports logic
│   │   └── admin.js           # Admin logic
│   ├── middleware/
│   │   ├── auth.js            # JWT authentication
│   │   └── admin.js           # Admin authorization
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Report.js          # Report model
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── reports.js         # Reports routes
│   │   └── admin.js           # Admin routes
│   ├── scripts/
│   │   └── seed.js            # Database seeding
│   └── index.js               # Server entry point
├── client/
│   └── src/
│       ├── components/        # React components
│       ├── pages/             # Page components
│       ├── contexts/          # React contexts
│       └── utils/             # Utility functions
├── .env.example               # Environment template
├── package.json               # Dependencies
└── README.md                  # Documentation
```

---

## 🗄️ Database Schema

### Users Table
- id (Primary Key)
- firstName
- lastName
- email (Unique)
- password (Hashed)
- role (user, admin, super_admin)
- department
- createdAt

### Reports Table
- id (Primary Key)
- reportedBy (Foreign Key → users)
- emailSubject
- senderEmail
- emailBody
- reportType (phishing, spam, malware)
- suspiciousLinks
- attachments
- status (pending, investigating, resolved, false_positive)
- updatedBy (Foreign Key → users)
- createdAt
- updatedAt

### Report Notes Table
- id (Primary Key)
- reportId (Foreign Key → reports)
- note
- addedBy (Foreign Key → users)
- createdAt

### Education Modules Table
- id (Primary Key)
- title
- description
- content
- difficulty
- estimatedTime
- category
- createdBy (Foreign Key → users)
- createdAt
- updatedAt

### User Progress Table
- id (Primary Key)
- userId (Foreign Key → users)
- moduleId (Foreign Key → education_modules)
- status
- score
- completedAt
- createdAt
- updatedAt

---

## 🔧 Troubleshooting

### Database Connection Issues

**Error: "connect ECONNREFUSED"**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env file
- Verify database credentials

**Error: "database does not exist"**
- Create the database: `CREATE DATABASE guardbulldog;`

### Port Already in Use

**Error: "Port 5000 is already in use"**
- Change PORT in .env file
- Or kill the process using port 5000

### Module Not Found

**Error: "Cannot find module"**
- Run `npm install` in root directory
- Run `npm install` in client directory

---

## 🚀 Deployment

### Heroku Deployment

1. **Create Heroku App:**
   ```bash
   heroku create your-app-name
   ```

2. **Add PostgreSQL:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set JWT_SECRET=your_secret_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **Seed Database:**
   ```bash
   heroku run npm run seed
   ```

### Other Platforms

- **Railway**: Connect GitHub repo and add PostgreSQL plugin
- **Render**: Add PostgreSQL database and set environment variables
- **DigitalOcean**: Use App Platform with managed PostgreSQL

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host:5432/db |
| JWT_SECRET | Secret key for JWT tokens | random_32_char_string |
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development/production |
| CLIENT_URL | Frontend URL | http://localhost:3000 |

---

## 🔐 Security Notes

1. **Never commit `.env` file** to version control
2. **Use strong JWT_SECRET** (minimum 32 characters)
3. **Enable SSL** in production
4. **Use HTTPS** for all production deployments
5. **Regularly update dependencies** for security patches

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the API documentation
3. Check server logs for error messages

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Database created
- [ ] .env file configured
- [ ] Dependencies installed (server & client)
- [ ] Database seeded with demo data
- [ ] Server starts without errors
- [ ] Client starts without errors
- [ ] Can login with demo accounts
- [ ] API endpoints responding correctly

---

**🎉 Your GUARDBULLDOG application is now fully configured and ready to use!**
