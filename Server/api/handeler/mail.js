var nodemailer = require('nodemailer');
var promisify = require('es6-promisify');
var pug = require('pug');
//var juice = require('juice');
//var htmltotext = require('html-to-text');

var transport = nodemailer.createTransport({
   
    host : 	process.env.EMAIL_HOST,
    port : process.env.EMAIL_PORT,
    auth : {
        user : process.env.AUTH_USER ,
        pass : process.env.AUTH_PASS ,
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