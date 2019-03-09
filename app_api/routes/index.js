var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.RAHASYA,
  userProperty: 'payload'
});

var verify = jwt({
  secret: process.env.RAHASYA,
  requestProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlHome = require('../controllers/home');
var ctrlAuth = require('../controllers/authentication');
var ctrlFgtPwd = require('../controllers/forgotpassword');
var ctrlResetPwd = require('../controllers/resetPassword');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/:id/uploadProfilePic', verify, ctrlProfile.uploadProfilePic);
//home
router.get('/home', auth, ctrlHome.homeRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//forgot pwd
router.post('/forgot-password', ctrlFgtPwd.forgotpassword);

//reset pwd
router.get('/validate-token', ctrlResetPwd.validateToken);
router.post('/reset-password', ctrlResetPwd.resetPassword);

module.exports = router;
