var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.resetPasswordCheckToken = function (req, res) {
  console.log("reset password")
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
      .exec(function (err, user) {
        if (err) {
          res.status(404).json(err);
          return;
        }else if(!user){
          res.status(401).json({"message":"Password reset token is invalid or has expired."});
        } else {
          res.status(200);
        }
      }); 
};
