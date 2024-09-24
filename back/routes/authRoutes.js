
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


// Registration route
router.post('/register', authController.register);
// Login route
router.post('/login', authController.login);
// OTP verification route
router.post('/verify-otp', authController.verifyOtp);
// Password setup route
router.post('/setup-password', authController.setupPassword);


module.exports = router;
