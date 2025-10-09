require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'GUARDBULLDOG API is running' });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/reports', require('./routes/reports'));

// 404 Handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ message: 'API endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
