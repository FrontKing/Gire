
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

 app.route('/setting/set')
 .post(
   userController.confirmToken,
   userController.confirmPassword,
   userController.updatePassword
 );

  //  app.route('/setting/forgot')
  //  .post(
  //   userController.forgot,
  //   userController.confirmPassword
  // );

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