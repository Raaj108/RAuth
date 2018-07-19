var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.RAHASYA,
  userProperty: 'payload'
});


var ctrlProfile = require('../controllers/profile');
var ctrlHome = require('../controllers/home');
var ctrlAuth = require('../controllers/authentication');
var ctrlFgtPwd = require('../controllers/forgotpassword');
var ctrlResetPwd = require('../controllers/resetPassword');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);
//home
router.get('/home', auth, ctrlHome.homeRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.post('/forgot-password', ctrlFgtPwd.forgotpassword);
router.get('/reset-password/:token', ctrlResetPwd.resetPasswordCheckToken);

module.exports = router;
