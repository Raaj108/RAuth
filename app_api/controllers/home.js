var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.homeRead = function (req, res) {
  console.log("home")
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError:  You need to login in order to access this page."
    });
  }else {
    // Otherwise continue
    User.findById(req.payload._id)
      .exec(function (err, user) {
        if (err) {
          res.status(404).json(err);
          return;
        } else {
          res.status(200).json(user);
        }
      });
  }

};
