// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend public folder
app.use(express.static(path.join(__dirname, '../frontend/public')));

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/cake-time';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/payment', require('./routes/PaymentRoutes'));

// Cart route
app.get('/api/cart', (req, res) => {
  res.json({ message: 'Cart endpoint' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



const https = require('https');
const fs = require('fs');

// Load SSL certificates
const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

// Create HTTPS server
const server = https.createServer(options, app);