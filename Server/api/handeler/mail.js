var nodemailer = require('nodemailer');
var promisify = require('es6-promisify');
var pug = require('pug');
//var juice = require('juice');
//var htmltotext = require('html-to-text');

var transport = nodemailer.createTransport({
    // host : 	'smtp.mailtrap.io',
    // port : 2525,
    // auth : {
    //     user : '62bb235575587e' ,
    //     pass : 'f2ded6a273336d' ,
    // }
    host : 	'smtp.gmail.com',
    port : 465,
    auth : {
        user : 'shahabvshahabi1996@gmail.com' ,
        pass : 'shahab51010' ,
    }
});
var generateTohtml = function(option){
    var html = pug.renderFile(__dirname + '/../../views/email/password-set.pug',option);
    return html;
}
exports.send = async function(option) {
    console.log(option);
    var html = generateTohtml(option);
    var mailoption = {
        from : 'gire@noreaply.com',
        to : option.email,
        subject : 'اعلام رمز عبور شما ',
        //'Hey ' + option.name + ' This is Your Password : ' + option.password
        html : html
    };
    var sendMail = promisify(transport.sendMail,transport);
    return sendMail(mailoption);
};