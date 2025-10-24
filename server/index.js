require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();
const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory');
}

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Define Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'GUARDBULLDOG API is running' });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/admin', require('./routes/admin'));

// 404 Handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
