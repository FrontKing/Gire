var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

// exports.login = passport.authenticate('local', {
//     failureRedirect : '/register',
//     successRedirect : '/login'
// });

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {  
    if(info && info.message === "Password or username are incorrect" ){
        info.message = "رمز یا نام کاربری شما نادرست است";
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'به دلیلی نمیتوان وارد شد'
        });
      }
      res.status(200).json({
        status: 'شما با موفقیت وارد شدید!',
        user : user
      });
    });
  })(req, res, next);
}

exports.logout = function(req,res){
    req.logout();
    res.json({'msg' : 'شما با موفیت خارج شدید!'});
}