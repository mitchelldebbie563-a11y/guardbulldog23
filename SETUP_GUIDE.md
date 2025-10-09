# GUARDBULLDOG Setup and Testing Guide

## Prerequisites

### 1. Install Node.js and npm
- Download Node.js from: https://nodejs.org/
- Choose the LTS (Long Term Support) version
- This will also install npm (Node Package Manager)
- Verify installation by running:
  ```bash
  node --version
  npm --version
  ```

### 2. Install MongoDB
- Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
- Follow the installation instructions for Windows
- Start MongoDB service (usually starts automatically)

## Project Setup

### 1. Install Dependencies
```bash
# Navigate to project root
cd C:\Users\USER\CascadeProjects\GUARDBULLDOG

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Configuration
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env file with your specific configuration:
# - Set MONGODB_URI to your MongoDB connection string
# - Set JWT_SECRET to a secure random string
# - Configure email settings if needed
```

### 3. Database Setup
```bash
# Start the server (this will create the database)
npm run dev

# In another terminal, populate sample data
node server/scripts/populateSampleData.js
```

## Running the Application

### Development Mode
```bash
# Start both backend and frontend in development mode
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000
- Both will auto-reload when you make changes

### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

## Testing the Application

### 1. User Registration and Authentication
- Navigate to http://localhost:3000
- Click "Register" to create a new account
- Use a @bowie.edu email address (required)
- Test login functionality

### 2. Dashboard Navigation
- Verify dashboard loads with user statistics
- Test navigation between different sections
- Check responsive design on different screen sizes

### 3. Phishing Report Submission
- Navigate to "Report Phishing"
- Test form validation
- Upload sample email files
- Verify report submission works

### 4. Education Center
- Browse available modules
- Complete a quiz
- Check progress tracking

### 5. Admin Features (if admin user)
- Access admin dashboard
- Review submitted reports
- Manage users and content

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   - Change PORT in .env file
   - Or kill the process using the port

2. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

3. **npm Install Errors**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and package-lock.json, then reinstall

4. **React Build Errors**
   - Check for syntax errors in React components
   - Ensure all dependencies are installed

### Performance Testing
- Test with multiple users
- Check response times
- Monitor memory usage
- Test file upload limits

## Security Testing

### 1. Authentication Testing
- Test invalid login attempts
- Verify JWT token expiration
- Test password strength requirements

### 2. Authorization Testing
- Verify role-based access control
- Test admin-only features with regular user
- Check API endpoint protections

### 3. Input Validation Testing
- Test form inputs with malicious data
- Verify file upload restrictions
- Test SQL injection prevention

## Browser Compatibility

Test the application in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Mobile Testing

Test responsive design on:
- Mobile phones (various sizes)
- Tablets
- Different orientations

## Deployment Checklist

Before deploying to production:
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database backups configured
- [ ] SSL certificates installed
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Monitoring setup
- [ ] Error logging configured

## Support

For technical issues:
- Check the troubleshooting section above
- Review application logs
- Contact the development team

## Version Information

- Node.js: 18+ recommended
- MongoDB: 5.0+ recommended
- React: 18.2.0
- Express: 4.18.2
