// var Sequelize = require('sequelize');

module.exports = function relation(app) {
  var ns = app.ns();
  var seq = ns.get('sequelize');
  var User = app.require('model/user');
  var Post = app.require('model/post');

  Post.belongsTo(User, {as: 'Author'});

  return seq.sync();
};
