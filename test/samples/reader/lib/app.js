var Kt = require('katalyst');

var Reader = Kt.Application.design('reader', __dirname, function () {
  this.ext(Kt.exts.nunjucks);
  this.ext(Kt.exts.sequelize);
  this.compose({
    '/': '/posts'
  });
});

module.exports = Reader;
