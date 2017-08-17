
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var mongodbErrorHandellers = require('mongoose-mongodb-errors');
mongoose.connect(process.env.DB_HOST);
mongoose.plugin(mongodbErrorHandellers);

var IncomeSchema = new Schema({
    price : {
        type : Number,
        trim : true,
        required : 'شما باید مقدار دخل خود را بنویسید'
    },
    title : {
        type : String,
        trim : true,
        required : "شما باید توضیحی برای دخل خود بنویسید"
    },
    author : {
        type : mongoose.Schema.ObjectId,
        ref : 'User' ,
    }
});

module.exports = mongoose.model('Income', IncomeSchema);
