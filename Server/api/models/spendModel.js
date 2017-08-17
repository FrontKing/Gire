
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var mongodbErrorHandellers = require('mongoose-mongodb-errors');
mongoose.connect(process.env.DB_HOST);
mongoose.plugin(mongodbErrorHandellers);

var SpendSchema = new Schema({
    price : {
        type : Number,
        trim : true,
        required : 'شما باید مقدار خرج خود را بنویسید'
    },
    title : {
        type : String,
        trim : true,
        required : "شما باید توضیحی برای خرج خود بنویسید"
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'Category' ,
        required : 'شما باید یک دسته بندی برای خود انتخاب کنید'
    },
    author : {
        type : mongoose.Schema.ObjectId,
        ref : 'User' ,
    }
});

module.exports = mongoose.model('Spend', SpendSchema);
