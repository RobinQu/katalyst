var Kt = require('katalyst');

module.exports = function (app) {
  var RepoController = app.require('controller/repo');
  var router = Kt.Router.create();
  router.get('/repos', RepoController.index);
  return router;
};
