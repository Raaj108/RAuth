var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.validateToken = function (req, res) { 
    User.findOne({ 
      $and: [
        {resetPasswordToken: req.headers.authorization},
        {resetPasswordExpires: {$gt : Date.now()}}
      ]      
    }).exec(function (err, user) {
        if (err) {
          res.status(404).json(err);
          return;
        }else if(!user){
          res.status(401).json({"message":"Password reset token is invalid or has expired."});
        } else {          
          res.status(200).json({"message":"Password reset token is valid."});
        }
      });
};

module.exports.resetPassword = function (req, res) {
    User.findOne({ 
      $and: [
        {resetPasswordToken: req.body.token},
        {resetPasswordExpires: {$gt : Date.now()}}
      ]      
    }).exec(function (err, user) {
        if (err) {
          res.status(404).json(err);
          return;
        }else if(!user){
          res.status(401).json({"message":"Password reset token is invalid or has expired."});
        } else {          
          user.setPassword(req.body.password);
          user.resetPasswordToken = '';
          user.save(function (err) {            
            if (err) {
              res.status(404).json(err);
              return;
            }            
            res.status(200);
            res.json({              
              "message": "Your password has been reset"
            });
          });
        }; 
      });
  }