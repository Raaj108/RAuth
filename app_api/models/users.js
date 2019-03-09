var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var key = process.env.RAHASYA;

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
    required: false
  },
  hash: String,
  salt: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

//Setting the Password to hash
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//Checking the Password
userSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

//create a JWT
userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 1);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    exp: parseInt(expiry.getTime() / 1000),
  }, key);
};

module.exports = mongoose.model('User', userSchema);
