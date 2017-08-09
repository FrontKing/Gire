
module.exports = function(app) {
var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');


  // user login and register
  app.route('/register')
  .post(
    userController.validateRegister,
    userController.register,
    userController.sendEmail);

  app.route('/login')
  .post(
    authController.login,
    userController.setToken
  );

 app.route('/accout/set')
 .post(
   userController.confirmToken,
   userController.confirmPassword,
   userController.updatePassword
 );

   app.route('/accout/forgot')
   .post(
    userController.confirmEmail,
    userController.send_setPasswordToEmail
  );

  app.route('/register')
  .get(userController.getReg);

  app.route('/login')
  .get(userController.index);
  
  app.route('/logout')
  .post(authController.logout);

  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
};