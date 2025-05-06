const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user with hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Create token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Signin Route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Signin attempt for email:', email);

        // Find user
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            console.log('No user found with email:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        console.log('Checking password...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);
        
        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        console.log('Signin successful for user:', user.email);

        res.json({ 
            token, 
            user: { 
                id: user._id, 
                email: user.email, 
                username: user.username 
            } 
        });
    } catch (err) {
        console.error('Signin error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error('Get current user error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;