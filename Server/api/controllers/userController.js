
var mongoose = require('mongoose');
  User = mongoose.model('User');
  
exports.listOfUsers = function(req, res) {
  /*User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });*/
  res.send("Welcome To Users");
};

exports.createUser = function(req, res) {
 /* var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });*/

};


