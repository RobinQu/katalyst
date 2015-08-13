module.exports = function (app) {
  var UserService = app.require('service/user');

  var UserController = {};

  UserController.login = function *() {
    var login = this.request.body;
    var user = yield UserService.findUserByLogin(login);
    if(!user) {
      this.flash = {error: 'name or password is not matched!'};
      this.redirect('/login');
    }
    this.session.user = user;
    this.flash = {info: 'You are logged-in as ' + user.lastName};
    this.redirect('/');
  };

  UserController.register = function *() {
    var data = this.request.body;
    if(data.password !== data.repeatPassword) {
      this.flash = {error: 'passwords unmatch'};
      return this.redirect('/login');
    }
    yield UserService.create(data);
    this.flash = {info: 'Account created; Please login.'};
    this.redirect('/');
  };

  return UserController;
};
