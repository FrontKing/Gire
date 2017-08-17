
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var mongodbErrorHandellers = require('mongoose-mongodb-errors');
mongoose.connect(process.env.DB_HOST);
mongoose.plugin(mongodbErrorHandellers);

var CatSchema = new Schema({
    name : {
        trim : true,
        type : String
    }
});
// var Cat = mongoose.model('Category', CatSchema)
// var cats = [
//     { name : 'خورد و خوراک' },
//     { name: 'پوشاک و لباس' },
//     { name: 'تفریح و سرگرمی' },
//     { name: 'ایاب ذهاب'},
//     { name: 'وسایل خانگی'},
//     { name: 'تحصیلات'},
//     { name: 'وسایل آرایشی بهداشتی'},
//     { name: 'اینترنت و ارتباطات'},
//     { name: 'تعمیرات و نگهداری'},
//     { name: 'قبوض'},
//     { name: 'اجاره خانه'},
//   ];

//   // use the Event model to insert/save
//   for (cat of cats) {
//     var newCat = new Cat(cat);
//         newCat.save();
//   }

module.exports = mongoose.model('Category', CatSchema);
