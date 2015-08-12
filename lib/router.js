var Router = module.exports = require('koa-router');

Router.create = function () {
  return new Router();
};
