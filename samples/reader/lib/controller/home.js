module.exports = function (app) {

  var HomeController = {};

  var UserService = app.require('service/user');

  HomeController.login = function *() {
    yield this.render('home/login');
  };

  HomeController.register = function *() {
    yield this.render('home/register');
  };

  HomeController.doLogout = function *() {
    this.session.user = null;
    this.flash = {success: 'Logout ok'};
    this.redirect('/');
  };

  HomeController.doLogin = function *() {
    var login = this.request.body;
    var user = yield UserService.findUserByLogin(login);
    if(!user) {
      this.flash = {error: 'name or password is not matched!'};
      this.redirect('/login');
      return;
    }
    this.session.user = user.toJSON();
    this.flash = {info: 'You are logged-in as ' + user.name};
    this.redirect('/');
  };

  HomeController.doRegister = function *() {
    var data = this.request.body;
    if(data.password !== data.repeatPassword) {
      this.flash = {error: 'passwords unmatch'};
      return this.redirect('/login');
    }
    yield UserService.create(data);
    this.flash = {info: 'Account created; Please login.'};
    this.redirect('/');
  };

  return HomeController;

};
