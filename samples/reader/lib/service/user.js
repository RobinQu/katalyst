var bcrypt = require('bcrypt');

module.exports = function (app) {
  var UserService = {};
  var User = app.require('model/user');

  UserService.findUserByLogin = function *(login) {
    console.log(login);
    var user = yield User.findOne({
      where: {
        name: login.name
      }
    });
    if(user && bcrypt.compareSync(login.password, user.password)) {
      return user;
    }
  };

  UserService.create = function *(data) {
    yield User.create({
      password: bcrypt.hashSync(data.password, 10),
      name: data.name
    });
  };

  UserService.destroy = function *(user) {
    yield user.destory();
  };

  return UserService;
};
