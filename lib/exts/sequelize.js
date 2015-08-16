var Sequelize = require('sequelize');
var _ = require('lodash');
var path = require('path');
var debug = require('catlog')('kt:ext:sequelize');

module.exports = function sequelize(app) {
  var ns = app.ns();
  var options = ns.get('options');
  var seq = new Sequelize(options.sequelize);
  ns.set('sequelize', seq);
  return app.glob('model').then(function (files) {
    _.each(files, function (file) {//load models
      debug('load %s as model', file);
      app.require(path.join('model', file), function (method) {
        return method(seq, Sequelize);
      });
    });
  });
};
