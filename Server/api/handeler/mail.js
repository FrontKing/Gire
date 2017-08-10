var nodemailer = require('nodemailer');
var promisify = require('es6-promisify');
var pug = require('pug');


var transport = nodemailer.createTransport({
    host : 'smtp.mailtrap.io',
    port : 2525,
    auth : {
        user : '62bb235575587e' ,
        pass : 'f2ded6a273336d' ,
    }
});
var generateTohtml = function(option){
    var html = pug.renderFile(__dirname + '/../../views/email/' + option.filename + '.pug',option);
    return html;
};
exports.send = async function(option) {
    console.log('making email');
    var html =  await generateTohtml(option);
    var mailoption = {
        from : 'gire@noreaply.com',
        to : option.email,
        subject : option.subject,
        html : html
    };
    var sendMail = promisify(transport.sendMail,transport);
    console.log("email didnt sent");
    return sendMail(mailoption);
};