const router = require('express').Router();
const {signup, login} = require('../Controllers/AuthController');
const {signupValidation, loginValidation} = require('../Middlewares/validation');

router.post('/signup', signupValidation, signup);

router.post('/login', loginValidation, login);

module.exports = router;