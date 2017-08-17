
var mongoose = require('mongoose');
var validator = require('validator');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var md5 = require('md5');
var mongodbErrorHandellers = require('mongoose-mongodb-errors');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect(process.env.DB_HOST);
mongoose.plugin(mongodbErrorHandellers);
var UserSchema = new Schema({
  name: {
    type: String,
    required: 'شما باید یک نام برای خود انتخاب کنید',
    trim : true,
  },
  email:{
    type:String,
    trim : true,
    unique : true,
    lowercase : true,
    validate : [validator.isEmail,'ایمیل آدرس شما درست نمی باشد'],
    required : 'شما باید یک ایمیل معتبر برای خود اراعه دهید!'
  },
  UserPhoto : {
      type:String,
      default : "/images/profile-black.jpg"
  },
  token : String,
  expiredToken : Date

});
UserSchema.plugin(passportLocalMongoose,{ usernameField : 'email'});
UserSchema.plugin(mongodbErrorHandellers);
module.exports = mongoose.model('User', UserSchema);