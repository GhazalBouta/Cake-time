const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cake-time')
  .then(() => {
    console.log('Connected to MongoDB');
    const User = require('./models/User');
    User.find({})
      .then(users => {
        console.log('Users:', JSON.stringify(users, null, 2));
        process.exit(0);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        process.exit(1);
      });
  })
  .catch(err => console.error('MongoDB connection error:', err));