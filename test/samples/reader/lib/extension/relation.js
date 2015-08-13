// var Sequelize = require('sequelize');

module.exports = function (app) {
  var ns = app.ns();
  var seq = ns.get('sequelize');
  var User = app.require('model/user');
  var Post = app.require('model/post');

  Post.belongsTo(User, {as: 'author'});

  return seq.sync();
};
