var Kt = require('katalyst');

module.exports = function (app) {
  var router = new Kt.Router();
  var auth = app.require('middleware/auth');
  var PostController = app.require('controller/post');
  router.param('post_id', PostController.load);
  router.get('/posts/new', auth, PostController.new);
  router.get('/posts/:post_id', PostController.show);
  router.post('/posts', auth, PostController.create);
  router.get('/posts', PostController.index);
  router.get('/posts/:post_id/edit', auth, PostController.edit);
  router.post('/posts/:post_id/update', auth, PostController.update);
  router.post('/posts/:post_id/desstroy', auth, PostController.destroy);
  return router;
};
