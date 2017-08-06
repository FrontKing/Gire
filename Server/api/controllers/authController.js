var passport = require('passport');

exports.login = passport.authenticate('local',{
    failureRedirect : '/register',
    successRedirect : '/login'
});

exports.logout = function(req,res){
    req.logout();
    res.json({'msg' : 'شما با موفیت خارج شدید!'});
}