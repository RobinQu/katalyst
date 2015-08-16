var Kt = require('katalyst');

var Reader = Kt.Application.design('reader', __dirname, function () {
  this.keys = ['rock', 'roll'];
  this.use(require('koa-bodyparser')());
  this.use(require('koa-generic-session')());
  this.use(require('koa-flash')());
  this.use(this.require('middleware/view_model'));
  this.ext(Kt.exts.nunjucks);
  this.ext(Kt.exts.sequelize);
  this.compose({
    '/': '/posts'
  });
});

module.exports = Reader;
