
module.exports = function(app) {
  var userController = require('../controllers/userController.js');


  // todoList Routes
  app.route('/users/')
    .get(userController.listOfUsers);
    
  app.route('/users/register')
  .post(userController.createUser);  

};