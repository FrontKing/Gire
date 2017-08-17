var mongoose = require('mongoose');
var Income = mongoose.model('Income');
var User = mongoose.model('User');
exports.incomeSave = async  function(req,res){
    var user = await User.findOne({token : req.body.token});
    var income = new Income({ 
        price : req.body.price,
        title : req.body.title,
        author : user._id
    }).save(function(err,result){
        if(err)
            res.json({status : "success",data : err});
        else{
            res.json({status : "success",data : "خرج شما با موفقیت ذخیره شد"});
        }
    });
};
exports.incomes = async function(req,res){
    var incomes = await Income.find({}).populate('author');   
    res.json({
        incomes : incomes
    });
};