var nj = require('koa-nunjucks');


module.exports = function (app) {
  app.use(nj({
    views: app.resolve('view')
  }));
};
