
module.exports = function(app) {
var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');


  // user login and register
  app.route('/register')
  //1. validate userinfo
  //2. register them 
  //3'. email them the password and tell them ur regestration is done!
  // redirect them to using angular
  .post(
    userController.validateRegister,
    userController.register,
    userController.sendEmail,
    //authController.login
  );

  app.route('/login')
  .post(userController.login);

  /*app.route('/')
  .get(userController.index);*/
  
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
};