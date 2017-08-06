
var mongoose = require('mongoose');
var User = mongoose.model('User');
var promisify = require('es6-promisify'); 
var uuid = require('uuid-random'); 
var mail = require('../handeler/mail.js');
exports.login = function(req, res) {
  
};

exports.validateRegister = function(req , res , next){
  User.findOne({email : req.body.email},function(err,user){
    if(user){
      console.log(user)
      res.json({'error' : 'این ایمیل قبلا استفاده شده است'});
      return ; 
    }
    else if(!user){ 
      req.sanitizeBody('name');
      req.checkBody('name','شما باید یک نام برای خود انتخاب کنید').notEmpty();
      req.checkBody('email','شما باید یک ایمیل معتبر برای خود اراعه دهید!').notEmpty().isEmail();
      req.sanitizeBody('email').normalizeEmail();
      // req.checkBody('password','شما باید یک رمز عبور برای خودتون اراعه بدید!').notEmpty();
      /*req.checkBody('password-confirm','لطفا رمز عبور خود را دوباره و درست وارد نمایید!').notEmpty();
      req.checkBody('password-confirm' , 'خطا رمز عبور شما درست نمی باشد !!!').equals(req.body.password);*/

      var errors = req.validationErrors();
      if(errors){
        res.json(errors);
        return;
      }
      next();
    }
  });
};
exports.register = async function(req, res , next) {
var password = uuid();
req.body.password = password.split('').slice(0 , 6).join('');
var new_user = new User({email : req.body.email, name : req.body.name});
var registerWithPromis = promisify(User.register,User);
await registerWithPromis(new_user,password);
console.log(req.body.password);
next();
};

exports.sendEmail =  async function(req, res){
  console.log(req.body.password)
  await mail.send({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  });
  res.json({msg : 'رمز عبور شما به ایمیل شما فرستاده شده است',type : 'success'});
};


exports.index = function(req,res){
  res.render('index');
}