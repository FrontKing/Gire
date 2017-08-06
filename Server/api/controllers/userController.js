
var mongoose = require('mongoose');
var User = mongoose.model('User');
var promisify = require('es6-promisify'); 
var uuid = require('uuid-random'); 
require('./api/handeler/mail.js');
exports.login = function(req, res) {
  
};

exports.validateRegister = function(req , res , next){
  
  req.sanitizeBody('name');
  req.checkBody('name','شما باید یک نام برای خود انتخاب کنید').notEmpty();
  req.checkBody('email','شما باید یک ایمیل معتبر برای خود اراعه دهید!').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail();
  // req.checkBody('password','شما باید یک رمز عبور برای خودتون اراعه بدید!').notEmpty();
  /*req.checkBody('password-confirm','لطفا رمز عبور خود را دوباره و درست وارد نمایید!').notEmpty();
  req.checkBody('password-confirm' , 'خطا رمز عبور شما درست نمی باشد !!!').equals(req.body.password);*/

  var errors = req.validationErrors();
  if(errors){
    var Err = errors.map(err => err.msg);
    res.json(Err,req.body);
    return;
  }
  next();
};
exports.register = async function(req, res , next) {
var password = uuid();
req.body.password = password.split('').slice(0 , 6).join('');
var new_user = new User({email : req.body.email, name : req.body.name});
var registerWithPromis = promisify(User.register,User);
await registerWithPromis(new_user,req.body.password);

next();
};

exports.sendEmail = function(req, res){
  transport.sendMail({
    from : 'gire@noreaply.com',
    to : req.body.email,
    subject : 'just a test',
    html : 'hey ' + req.body.name  +  ' this is Your Password : <a href="#">' + req.body.password + '</a>',
    text : "Your Pass Word"
 });
};


