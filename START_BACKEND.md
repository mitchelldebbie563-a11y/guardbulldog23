# GUARDBULLDOG Backend Setup Guide

## Quick Start (3 Steps)

### 1. Open Command Prompt as Administrator
- Press `Windows + R`
- Type `cmd` and press `Ctrl + Shift + Enter`
- Click "Yes" when prompted

### 2. Navigate to Server Directory
```cmd
cd C:\Users\USER\CascadeProjects\GUARDBULLDOG\server
```

### 3. Install Dependencies and Start Server
```cmd
npm install
npm start
```

## What This Does:
- ✅ Installs all required packages (Express, MongoDB, etc.)
- ✅ Starts the API server on http://localhost:5000
- ✅ Connects to MongoDB database
- ✅ Enables real authentication and data storage

## Backend Features Available:
- **Authentication API**: Real login/signup with JWT tokens
- **Reports API**: Store and retrieve phishing reports
- **Admin API**: System statistics and user management
- **Education API**: Training modules and progress tracking

## Database Options:

### Option A: Local MongoDB (Recommended for Development)
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run automatically

### Option B: MongoDB Atlas (Cloud Database)
1. Sign up at https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update MONGODB_URI in .env file

## API Endpoints:
- `GET /api/health` - Check server status
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/reports` - Get all reports
- `POST /api/reports` - Submit new report
- `GET /api/admin/stats` - Admin dashboard data

## Environment Variables (.env file already created):
```
MONGODB_URI=mongodb://localhost:27017/guardbulldog
JWT_SECRET=guardbulldog_super_secure_jwt_secret_key_2024_bowie_state_university_cybersecurity
PORT=5000
NODE_ENV=development
```

## Testing the Backend:
1. Open browser to http://localhost:5000/api/health
2. Should see: `{"status":"OK","message":"GUARDBULLDOG API is running"}`
3. Open the website - it will automatically detect and connect to the backend

## Troubleshooting:
- **"npm not recognized"**: Node.js not properly installed or not in PATH
- **"MongoDB connection error"**: Install MongoDB or use Atlas cloud database
- **Port 5000 in use**: Change PORT in .env file to 5001, 5002, etc.

## Files Created:
- ✅ `.env` - Environment variables
- ✅ `package.json` - Dependencies list
- ✅ `backend-with-api.html` - Website with API integration
