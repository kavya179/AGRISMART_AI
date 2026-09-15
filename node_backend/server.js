const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const farmerRoutes = require('./routes/farmerRoutes');
const authRoutes = require('./routes/authRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: [corsOrigin, 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/farmers', farmerRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AgriSmart AI - Node.js Application Service',
    description: 'Handles user profiles, farm records, and MongoDB persistence',
    healthCheck: '/api/health',
    version: '1.0.0',
    status: 'operational',
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🌿 AgriSmart Node/Express Service is RUNNING`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🩺 Health API: http://localhost:${PORT}/api/health`);
  console.log(`=================================================`);
});

module.exports = app;
