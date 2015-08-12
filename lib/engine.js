// var assert = require('assert');
var debug = require('catlog')('katalyst:engine');
var Promise = require('bluebird');
var glob = Promise.promisify(require('glob'));
var path = require('path');
var _ = require('lodash');
// var kit = require('./kit');
var fs = require('fs');
// var Router = require('koa-router');
var RequireCache = require('./require_cache');

var proto = module.exports = {};

proto.stat = function (relative) {
  var fp = this.resolve(relative);
  return fs.statSync(fp);
};

proto.resolve = function (relative) {
  relative = relative.replace(/\.js$/, '');
  return path.resolve(this.home, relative);
};

proto.require = function (relative, loader) {
  var fp = this.resolve(relative);
  var cache = RequireCache[fp];
  if(!cache) {
    var self = this;
    loader = loader || function (method) {
      return method(self);
    };
    cache = RequireCache[fp] = loader(require(fp));
  }
  return cache;
};

proto.batchRequire = function (dir, callback) {
  var self = this;
  var returnObj = function (obj) {
    return obj;
  };
  return this.glob(dir).then(function (files) {
    var props = {};
    _.chain(files).reject(function (file) {//no index.js file
      return file.split('/').pop() === 'index.js';
    }).each(function (file) {
      var relative = path.join(dir, file);
      props[file] = self.require(relative, returnObj);
    }).value();
    return props;
  }).nodeify(callback);
};

proto.glob = function (dir, callback) {
  return glob('**/*.js', {
    cwd: path.join(this.home, dir)
  }).nodeify(callback);
};

proto.inject = function (ns, callback) {
  debug('inject namespace on %s', this.name);
  var self = this;
  return self.batchRequire('extension').then(function (extensions) {//load extensions
    var exts = [];
    debug('load extentions %s', Object.keys(extensions));
    _.forOwn(extensions, function (ext) {
      var ret = ext(self);
      if(ret) {
        exts.push(ret);
      }
    });
    return Promise.all(exts).then(function () {
      return self.batchRequire('router').then(function (routers) {
        debug('load routers %s', Object.keys(routers));
        _.forOwn(routers, function (router) {
          self.use(router(self).middleware());
        });
      });
    });
  }).nodeify(callback);
};
