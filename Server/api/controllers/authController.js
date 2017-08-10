var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {  
    if(info && info.message === "Password or username are incorrect" ){
        info.message = "رمز یا نام کاربری شما نادرست است";
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        status : 'error',
        data: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.json({
          status : 'error',
          data : 'به دلیلی نمیتوان وارد شد'
        });
      }
      next();
    });
  })(req, res, next);
}

exports.logout = async function(req,res){
    var user = await User.findOne({
      token : req.body.token ,
      expiredToken : { $gt : Date.now()}
    });
    if(user){
      user.token = undefined;
      user.expiredToken = undefined;
      await user.save();
      req.logout();
      res.json({status : 'success' , data : 'شما با موفقیت خارج شدید!'});
    }
    if(!user){
      res.json({
        status : 'error',
        data : 'شما هنوز عضو نشده اید یا باید دوباره وارد شوید!'
      });
      return ;
    }
}