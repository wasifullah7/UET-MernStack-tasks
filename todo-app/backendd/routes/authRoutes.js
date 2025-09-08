const express = require("express");
const router = express.Router();
const User = require('../models/userModels')
const {register,login, logOut, sendOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword} = require('../controller/authController');
const userAuth = require("../middleware/authMiddleware");

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logOut)
router.post('/sendOtp',userAuth, sendOtp)
router.post('/verifyEmail',userAuth, verifyEmail)
router.get('/isAuth',userAuth, isAuthenticated)
router.post('/resetOtp', sendResetOtp)
router.post('/resetPass', resetPassword )


module.exports = router