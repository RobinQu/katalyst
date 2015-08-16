var _ = require('lodash');

module.exports = function (app) {
  var RepoController = {};

  RepoController.index = function *() {
    var githost = this.ns.get('githost');
    var groups = yield githost.listGroup();
    var repos = [];
    for(var i = 0, len = groups.length; i < len; i++) {
      var ret = yield githost.listRepo(groups[i]);
      repos = repos.concat(ret.map(function (r) {
        return {
          group: groups[i],
          name: r
        }
      }));
    }
    yield this.render('repo/list', {
      repos: repos
    });
  };

  return RepoController;
};
