
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://test:test@ds129593.mlab.com:29593/giredb");

var UserSchema = new Schema({
  name: {
    type: String,
    Required: 'شما باید یک نامی برای خود انتخاب کنید',
     trim : true,
  },
  email:{
      type:String,
      required : 'شما باید یک ایمیل معتبر برای خود اراعه دهید!',
      trim : true,
      unique : true
  },
  UserPhoto : {
      type:String,
      default : "/images/profile-black.jpg"
  }
});

module.exports = mongoose.model('User', UserSchema);