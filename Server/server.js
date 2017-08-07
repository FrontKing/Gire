var express = require('express');
var app = express();
var ejs = require('ejs');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var expressValidator = require('express-validator');
require('./api/models/userModel.js');
require('./api/handeler/passport.js');
require('./api/handeler/mail.js');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', "*");
   // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
var routes = require('./api/routes/userRoutes.js');
routes(app);


var port = process.env.PORT || 8000 ;
app.listen(port,function(){
    console.log("You Are Listening to Port" + port);
});