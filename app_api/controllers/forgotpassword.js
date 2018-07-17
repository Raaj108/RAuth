var mongoose = require('mongoose');
var User = mongoose.model('User');
var nodemailer = require('nodemailer');


//The Forgot-Password API Controller
module.exports.forgotpassword = function (req, res) {
 console.log("Forgot password");
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      var toEmail = req.body.email;
      var token = token = user.generateJwt();
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email_uName,
          pass:  process.env.Email_pass
        }
      });

      var mailOptions = {
        from: 'rajpatil925@gmail.com',
        to: toEmail,
        subject: 'RAuth link for resetting your password.',  
        html: '<p>RAuth link for resetting your password. Click on this link to reset your password. <a href="http://localhost:3001/reset-password?token=' + token + '">here</a> to reset your password</p>'
             
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
           res.status(401).json({
              "message": "An error occured while sending you reset password link. Please try again after sometime."
            });
            
          console.log("Error : " + error);
        } else {
            res.status(200).json({
              "message": "Link to reset your password has been sent to your email address."
            });
            console.log('Email sent: ' + info.response);
        }
      });      
      return
    } else {
       res.status(401).json({
        "message": " User with this email address is not found."
      });     
    }
  });
};
