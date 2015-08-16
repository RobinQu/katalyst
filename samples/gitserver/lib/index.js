var Kt = require('katalyst');
var gh = require('githost');

module.exports = Kt.Application.design('gitserver', __dirname, function (ns) {
  var githost = new gh.GitHost();
  ns.set('githost', githost);
  this.compose({
    '/repo': require('./app/repo'),
    '/web': require('./app/web'),
    '/': '/web'
  })
});
