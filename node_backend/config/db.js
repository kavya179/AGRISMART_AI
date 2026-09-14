const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Includes fallback logging so the dev server can start and indicate connection status
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrismart_db';
  
  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000, // Fast fail for local dev health checks
    });
    console.log(`[AgriSmart Node Service] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[AgriSmart Node Service] MongoDB Connection Warning: ${error.message}`);
    console.warn(`[AgriSmart Node Service] Server will continue running. Ensure MongoDB service is started on ${mongoUri}`);
    return false;
  }
};

module.exports = connectDB;
