var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

//The Register API Controller
module.exports.register = function (req, res) {

  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      res.status(404).json(err);
      return;
    }
    if (user) {
      res.status(404).json({
        "message": "User already exist"
      });
      return
    } else {
      var user = new User();

      user.name = req.body.name;
      user.email = req.body.email;

      user.setPassword(req.body.password);

      user.save(function (err) {
        var token;
        if (err) {
          res.status(404).json(err);
          return;
        }

        token = user.generateJwt();
        res.status(200);
        res.json({
          "token": token
        });
      });
    }
  });
};


//The Login API Controller
module.exports.login = function (req, res) {

  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
