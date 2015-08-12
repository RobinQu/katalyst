module.exports = function (app) {
  var PostService = app.require('service/post');

  var PostController = {};

  PostController.index = function *() {
    var posts = yield PostService.list(this.query);
    yield this.render('post/list', {
      posts: posts
    });
  };

  PostController.new = function *() {
    yield this.render('post/new');
  };

  PostController.edit = function *() {
    yield this.render('post/edit');
  };

  PostController.create = function *() {
    var payload = this.request.body;
    var post = yield PostService.create(payload);
    this.redirect('/posts/' + post.id);
  };

  PostController.update = function *() {
    var post = this.ns.get('post');
    var update = this.request.body;
    yield PostService.update(post, update);
    this.redirect('/posts');
  };

  PostController.show = function *() {
    yield this.render('post/show', {
      post: this.ns.get('post')
    });
  };

  PostController.load = function *(id, next) {
    this.ns.set('post', yield PostService.get(id));
    yield next;
  };

  PostController.destroy = function () {
    PostService.destroy(this.ns.get('post'));
    this.redirect('/posts');
  };

  return PostController;
};
