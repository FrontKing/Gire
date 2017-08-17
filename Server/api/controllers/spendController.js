var mongoose = require('mongoose');
var Cats = mongoose.model('Category');
var Spend = mongoose.model('Spend');
var User = mongoose.model('User');
exports.spendSave = async  function(req,res){
    var user = await User.findOne({token : req.body.token});
    var spend = new Spend({ 
        price : req.body.price,
        title : req.body.title,
        category : req.body.categoryID,
        author : user._id
    }).save(function(err,result){
        if(err)
            res.json({status : "success",data : err});
        else{
            res.json({status : "success",data : "خرج شما با موفقیت ذخیره شد"});
        }
    });
};
exports.spends = async function(req,res){
    var spends = await Spend.find({}).populate('category').populate('author');   
    res.json({
        spends : spends
    });
};