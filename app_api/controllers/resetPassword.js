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
          console.log(user)
          res.status(200).json({"message":"Password reset token is valid."});
        }
      });
};
