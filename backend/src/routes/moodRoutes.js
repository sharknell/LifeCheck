const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const moodController = require('../controllers/moodController');

router.post('/', authMiddleware, moodController.addMood);
router.get('/', authMiddleware, moodController.getMyMoods);

module.exports = router;
