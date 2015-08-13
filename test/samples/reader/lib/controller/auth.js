module.exports = function () {

  var AuthController = {};

  AuthController.login = function *() {
    yield this.render('auth/login');
  };

  AuthController.register = function *() {
    yield this.render('auth/register');
  };

  return AuthController;

};
