var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {
    console.log("profile")
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
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

module.exports.uploadProfilePic = function (req, res) {
    console.log("Profile Picture service")
    console.log(req)
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        res.status(200).json({
            "x": "found"
        });
    }
};
