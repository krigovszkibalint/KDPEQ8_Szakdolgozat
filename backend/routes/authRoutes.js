const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Auth Routes

// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
// /api/logout
router.get('/logout', logout);
// /api/profile
router.get('/profile', isAuthenticated, userProfile);

module.exports = router;