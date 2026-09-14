const mongoose = require('mongoose');

/**
 * Health check controller for Node.js Express service
 * Returns server uptime, memory usage, MongoDB status, and service metadata
 */
const getHealthStatus = async (req, res) => {
  const mongoStatusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };

  const mongoStateCode = mongoose.connection.readyState;
  const mongoState = mongoStatusMap[mongoStateCode] || 'Unknown';

  const healthData = {
    service: 'AgriSmart Node.js/Express Application Service',
    status: 'online',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    database: {
      type: 'MongoDB',
      status: mongoState,
      isConnected: mongoStateCode === 1,
      targetDb: mongoose.connection.name || 'agrismart_db',
    },
    roles: [
      'Farmer Profiles Management',
      'Crop Logs & Scan History Storage',
      'User Authentication & Preferences',
      'Community & Farmer Records Store',
    ],
  };

  res.status(200).json(healthData);
};

module.exports = {
  getHealthStatus,
};
