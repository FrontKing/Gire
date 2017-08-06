var nodemailer = require('nodemailer');
var promisify = require('es6-promisify');
//var juice = require('juice');
//var htmltotext = require('html-to-text');

var transport = nodemailer.createTransport({
    host : 	'smtp.mailtrap.io',
    port : 2525,
    auth : {
        user : '62bb235575587e' ,
        pass : 'f2ded6a273336d' ,
    }
});
/*var name = "shahab";
var email = "shahabvshahabi1996@gmail.com";
var password = 'asdadasdassd'
transport.sendMail({
    from : 'gire@noreaply.com',
    to : email,
    subject : 'just a test',
    html : 'hey ' + name  +  ' this is Your Password : <a href="#"> ' + password + '</a> and You Cand Login With that',
    text : "text"
 })*/

exports.send = async function(option) {
    var mailoption = {
        from : 'Gire <noreaply@gire.com>',
        to : option.email,
        subject : 'اعلام رمز عبور شما ',
        html : 'Hey ' + option.name + ' This is Your Password : ' + option.password
    };
    var sendMail = promisify(transport.sendMail,transport);
    return sendMail(mailoption);
};