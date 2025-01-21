const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
// Define API routes
const productRoutes = require('./routes/products'); // Ensure this is correct
app.use('/api/products', productRoutes); // Ensure this matches your fetch request

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});