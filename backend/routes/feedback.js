const express = require('express');
const router = express.Router();
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');

router.post('/', createFeedback);
router.get('/', getAllFeedback);

module.exports = router;