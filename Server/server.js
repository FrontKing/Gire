var express = require('express');
var app = express();
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var expressValidator = require('express-validator');
var UserModel = require('./api/models/userModel.js');


app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(expressValidator());

app.use(express.static('./public'))

var routes = require('./api/routes/userRoutes.js');
routes(app);


var port = process.env.PORT || 3000 ;
app.listen(port,function(){
    console.log("You Are Listening to Port" + port);
});