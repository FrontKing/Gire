
module.exports = function(app) {
var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');
var spendController = require('../controllers/spendController.js');  
var incomeController = require('../controllers/incomeController.js');

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

  app.route('/logout')
  .post(authController.logout);

// set password and forgot
 app.route('/account/set')
 .post(
   userController.confirmToken,
   userController.confirmPassword,
   userController.updatePassword
 );

   app.route('/account/forgot')
   .post(
    userController.confirmEmail,
    userController.send_setPasswordToEmail
  );
  //spend list
  app.route('/spend/save')
  .post(userController.confirmToken,spendController.spendSave);
  
  app.route('/spends')
  .get(spendController.spends);

  // income list
  app.route('/income/save')
  .post(userController.confirmToken,incomeController.incomeSave);

  app.route('/incomes')
  .get(incomeController.incomes);

  //samples
  app.route('/register')
  .get(userController.getReg);

  app.route('/login')
  .get(userController.index);
  
  // 404 not found
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
};