var express = require('express');
var app = express();
var ejs = require('ejs');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var expressValidator = require('express-validator');
require('./api/models/userModel.js');
require('./api/handeler/passport.js');
require('./api/handeler/mail.js');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
//this is temporary
app.set('view engine', 'ejs');

app.use(flash());
app.use(expressValidator());

app.use(express.static('./public'));

var routes = require('./api/routes/userRoutes.js');
routes(app);


var port = process.env.PORT || 8000 ;
app.listen(port,function(){
    console.log("You Are Listening to Port" + port);
});