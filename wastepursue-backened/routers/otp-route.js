const express = require('express');
const otpController = require('../controllers/otpcontrollers');
const router = express.Router();
router.post('/send-otp', otpController.sendOTP);

const { verifyOTP } = require('../controllers/otpcontrollers');


router.post('/verify-otp', verifyOTP);
module.exports = router;