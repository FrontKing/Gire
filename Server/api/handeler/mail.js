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

exports.send = async function(option) {
    var mailoption = {
        from : 'gire@noreaply.com',
        to : option.email,
        subject : 'اعلام رمز عبور شما ',
        html : 'Hey ' + option.name + ' This is Your Password : ' + option.password
    };
    var sendMail = promisify(transport.sendMail,transport);
    return sendMail(mailoption);
};