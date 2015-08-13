var nj = require('koa-nunjucks');

module.exports = function nunjuncks(app) {
  app.use(nj({
    views: app.resolve('view')
  }));
};
