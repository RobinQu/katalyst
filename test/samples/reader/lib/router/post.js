var Kt = require('katalyst');

module.exports = function (app) {
  var router = new Kt.Router();
  var PostController = app.require('controller/post');
  router.param('post_id', PostController.load);
  router.get('/posts/:post_id', PostController.show);
  router.post('/posts', PostController.create);
  router.get('/posts', PostController.index);
  router.post('/posts/:post_id/update', PostController.update);
  router.post('/posts/:post_id/desstroy', PostController.destroy);
  return router;
};
