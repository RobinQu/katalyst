var Promise = require('bluebird');

// var Kt = require('katalyst');

module.exports = function (app) {

  var User = app.require('model/user');
  var Post = app.require('model/post');

  // var PostService = Kt.Service.create(Post);
  var PostService = {};

  PostService.create = function (post) {
    return new Promise(function (resolve, reject) {
      if(post.title.indexOf('password') > 0) {
        return reject(new Error('senstive data is found'));
      }
      return Post.create(post);
    });
  };

  PostService.list = function (query) {
    return Post.findAll(query);
  };

  PostService.get = function (id) {
    return Post.findById(id);
  };

  PostService.update = function (post, update) {
    return post.update(update);
  };

  PostService.destroy = function (post) {
    return post.destroy();
  };

  PostService.generateWelcomeNote = function (userId) {
    return User.find(userId).then(function (user) {
      return PostService.create({
        title: 'Hello, world',
        content: 'My name is ' + user.name
      });
    });
  };

  return PostService;
};
