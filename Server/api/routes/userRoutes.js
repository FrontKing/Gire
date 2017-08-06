
module.exports = function(app) {
var userController = require('../controllers/userController.js');
var authController = require('../controllers/authController.js');


  // user login and register
  app.route('/register')
  .post(userController.validateRegister,userController.register,userController.sendEmail);

  app.route('/login')
  .post(authController.login);


  app.route('/register')
  .get(userController.getReg);

  app.route('/login')
  .get(userController.index);
  
  app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });
};