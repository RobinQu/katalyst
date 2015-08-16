var Kt = require('katalyst');
var gh = require('githost');

module.exports = Kt.Application.design('repo', __dirname, function (ns) {
  var githost = ns.get('githost');
  gh.repo(this, {
    githost: githost
  })
});
