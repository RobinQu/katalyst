var Kt = require('katalyst')

module.exports = function (app) {
  var router = Kt.Router.create();
  var HomeController = app.require('controller/home');
  router.post('/register', HomeController.doRegister);
  router.post('/login', HomeController.doLogin);
  router.get('/register', HomeController.register);
  router.get('/login', HomeController.login);
  return router;
};
