const express = require('express');
const { getUserData } = require('../controller/userController');
const userAuth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/userdata', userAuth, getUserData);
module.exports = router;