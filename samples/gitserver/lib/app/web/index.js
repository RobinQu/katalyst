var Kt = require('katalyst');

module.exports = Kt.Application.design('web', __dirname, function () {
  this.ext(Kt.exts.nunjucks);
  this.compose({
    '/': '/repos'
  });
});
