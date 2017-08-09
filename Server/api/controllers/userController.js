
var mongoose = require('mongoose');
var User = mongoose.model('User');
var promisify = require('es6-promisify'); 
var uuid = require('uuid-random'); 
var passport = require('passport');
var mail = require('../handeler/mail.js');
exports.validateRegister = async function(req , res , next){
  console.log(req.body);
  await User.findOne({email : req.body.email },function(err,user){
    if(user){
      console.log(user);
      res.json({ status : 'error' , data: 
       'این ایمیل قبلا استفاده شده است'});
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
    password : req.body.password,
    setpassUrl : 'https://gire.surge.sh/login'
  });
  res.json({data:[{
   message : 'رمز عبور شما به ایمیل شما فرستاده شده است',
  }] ,status : 'success'});
};

exports.confirmPassword = function(req,res,next){
  if(req.body.password === req.body['password-confirm']){
    next();
    return ;
  }
  else{
    res.json({status : "error",data : 'رمز عبور با تکرار رمز مطابقت ندارد!' });
    return ; 
  }
};

exports.updatePassword = async function(req,res){
  var user = await User.findOne({email : req.body.email});
  var setPassword = promisify(user.setPassword,user);
  await setPassword(req.body.password);
  res.json({ status : 'success', data : 'رمز شما با موفقیت تغییر پیدا کرد'});
};

exports.confirmToken = async function(req,res,next){
  var user = await User.find({
    token : req.body.token ,
    expiredToken : { $gt : Date.now()}
  });
  if(user){
    next();
    return ; 
  }
  if(!user){
    res.json({status : 'error' ,data : 'شما هنوز عضو نشده اید یا باید دوباره وارد شوید!'})
  }
};
exports.setToken = async function(req,res){
  var user = await User.findOne({email : req.body.email})
  var token = uuid();
  user.token = token;
  user.expiredToken = Date.now() + 172800000 ;
  await user.save();
  res.status(200).json({
      status: 'شما با موفقیت وارد شدید!',
      user : user
  });
}
exports.index = function(req,res){
  res.render('login');
};

exports.getReg = function(req,res){
  res.render('index')
}