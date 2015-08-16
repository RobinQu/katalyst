var assert = require('assert');
var debug = require('catlog')('kt:engine');
var Promise = require('bluebird');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');
var RequireCache = require('./require_cache');

var proto = module.exports = {};

proto._require = require;

proto._glob = Promise.promisify(glob);

proto.init = function (options) {
  debug('init');
  this.kt = true;
  this.type = 'KtHost';
  if(options) {
    if(options.home) {
      //override home path
      this.home = options.home;
    }
    if(options.name) {
      this.name = options.name;
    }
  }
  this.extensions = {};
};

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
  if(cache) {
    debug('require %s from cache', relative);
  } else {
    debug('require %s from fs', relative);
    var self = this;
    loader = loader || function (method) {
      return method(self);
    };
    cache = RequireCache[fp] = loader(this._require(fp));
  }
  return cache;
};

proto.batchRequire = function (dir, callback) {
  var self = this;
  var returnObj = function (obj) {
    return obj;
  };
  return this.glob(dir).then(function (files) {
    debug('found %s *.js in %s', files.length, dir);
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
  return this._glob('**/*.js', {
    cwd: path.join(this.home, dir)
  }).nodeify(callback);
};

proto.ext = function (name, func) {
  if(typeof name === 'function') {
    func = name;
    name = func.name;
  }
  assert(name && func, 'should provide name and extention method');
  debug('use ext %s', name);
  this.extensions[name] = func;
  return this;
};

proto.inject = function (ns) {
  assert(this.name && this.home, 'should have name and home');
  debug('inject namespace on %s', this.name);
  var self = this;
  return self.batchRequire('extension').then(function (extensions) {//load extensions
    debug('loaded from extention folder %s', Object.keys(extensions));
    _.forOwn(extensions, function (ext, k) {
      assert(ext.name, 'should have extention name');
      if(self.extensions[ext.name]) {
        debug('ext %s already exists; skip ext at %s', ext.name, k);
      } else {
        self.ext(ext.name, ext);
      }
    });
    debug('all extensions %s', Object.keys(self.extensions));
    return Promise.each(_.values(self.extensions), function (ext) {
      var ret = ext(self);
      if(ret) {
        debug('apply async ext %s', ext.name);
        return ret;
      } else {
        debug('apply sync ext %s', ext.name);
      }
    }).then(function () {
      return self.batchRequire('router').then(function (routers) {
        // debug('load routers %s', Object.keys(routers));
        _.forOwn(routers, function (router, k) {
          debug('install router %s on %s', k, self.name);
          self.use(router(self).middleware());
        });
      });
    });
  });
  // internal method, no need to wrap a node callback
  // .nodeify(callback);
};
