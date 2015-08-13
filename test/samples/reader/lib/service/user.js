var bcrypt = require('bcrypt');

module.exports = function (app) {
  var UserService = {};
  var User = app.require('model/user');

  UserService.findUserByLogin = function *(login) {
    var user = yield User.findOne({
      where: {
        name: login.name
      }
    });
    if(bcrypt.compareSync(login.password, user.password)) {
      return user;
    }
  };

  UserService.create = function *(data) {
    yield User.create({
      password: bcrypt.hashSync(data.password, 10),
      name: data.name
    });
  };

  return UserService;
};
