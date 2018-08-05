var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

//The Forgot-Password API Controller
module.exports.forgotpassword = function (req, res) {
 console.log("Forgot password");
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }else if(!user)  {
       res.status(401).json({
        "message": " User with this email address is not found."
      });     
    }else {
      var toEmail = req.body.email; 
      var token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires =  Date.now() + 3600000; // 1 hour
      
      user.save(function(err){
        if(err){
           console.log(err)
        }else{
          console.log("saved")
        }
      });

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email_uName,
          pass:  process.env.Email_pass
        }
      });

      var mailOptions = {
        from: process.env.Email_uName,
        to: toEmail,
        subject: 'RAuth link for resetting your password.',  
        text:'Hello from RAuth,\n\n'+
        'We recently received your request to reset the password for your "rajj108" mLab account user. To do so, '+
        'Please click on the following link, or paste this into your browser:\n' +
        'http://' + req.headers.host + '/reset-password/' + token + '\n\n' +
        "For your account's protection, the above link expires in one hour \n\n"+
        'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'+
        'Thank You.'                 
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(401).json({
              "message": "An error occured while sending you reset password link. Please try again after sometime."
            });            
          console.log("Error : " + error);
        } else {
            res.status(200).json({
            "token":token,
            "message": 'An e-mail has been sent to ' + user.email + ' with further instructions.'
        }); 
        console.log("info : " + info);           
        }
      });      
    }
  });
};
