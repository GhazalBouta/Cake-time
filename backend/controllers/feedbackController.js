const Feedback = require('../models/feedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    
    const feedback = new Feedback({
      name,
      email,
      rating,
      comment
    });

    const savedFeedback = await feedback.save();
    
    res.status(201).json({
      success: true,
      data: savedFeedback
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedback.length,
      data: feedback
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};