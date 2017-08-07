
var mongoose = require('mongoose');
var User = mongoose.model('User');
var promisify = require('es6-promisify'); 
var uuid = require('uuid-random'); 
var passport = require('passport');
var mail = require('../handeler/mail.js');
exports.validateRegister = function(req , res , next){
  console.log(req.query);
  if(req.query.length>0){
    req.body = req.query;
  }
  console.log(req.body);
  User.findOne({email : req.body.email || req.query.email },function(err,user){
    if(user){
      console.log(user)
      res.json({'error' : 'این ایمیل قبلا استفاده شده است'});
      return ; 
    }
    else if(!user){ 
      //req.sanitizeBody('name');
      req.checkBody('name','شما باید یک نام برای خود انتخاب کنید').notEmpty();
      req.checkBody('email','شما باید یک ایمیل معتبر برای خود اراعه دهید!').notEmpty().isEmail();
      req.sanitizeBody('email').normalizeEmail();
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
  var registerWithPromis = promisify(User.register , User);
  await registerWithPromis(new_user,req.body.password);
  console.log(req.body);
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
  res.render('login');
};

exports.getReg = function(req,res){
  res.render('index')
}