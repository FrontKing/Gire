var nodemailer = require('nodemailer');
var promisify = require('es6-promisify');
var pug = require('pug');
//var juice = require('juice');
//var htmltotext = require('html-to-text');

var transport = nodemailer.createTransport({
   
    host : 	'smtp.gmail.com',
    port : 465,
    auth : {
        user : 'shahabvshahabi1996@gmail.com' ,
        pass : 'shahab51010' ,
    }
});
var generateTohtml = function(option){
    var html = pug.renderFile(__dirname + '/../../views/email/' + filename + '.pug',option);
    return html;
}
exports.send = async function(option) {
    console.log(option);
    var html = generateTohtml(option);
    var mailoption = {
        from : 'gire@noreaply.com',
        to : option.email,
        subject : option.subject,
        html : html
    };
    var sendMail = promisify(transport.sendMail,transport);
    return sendMail(mailoption);
};