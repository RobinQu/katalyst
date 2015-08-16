var _ = require('lodash');
var debug = require('catlog')('kt:host');
var assert = require('assert');
var fs = require('fs');
var ap = require('koa-app-party');

var KtApplication = ap.Container.extend(function () {
  debug('init');
  this.kt = true;
  this.type = 'KtHost';
  this.extensions = {};
});

var proto = KtApplication.prototype;

_.extend(proto, require('./engine'));

KtApplication.design = function (name, home, configure) {
  assert(name, 'should provide name');
  assert(home, 'should provide home path');
  assert(fs.statSync(home).isDirectory(), 'should provide path of a directory as home path');
  //call super
  return ap.Container.design.call(this, name, function (ns) {
    this.home = home;
    ns.set('home', home);
    if(configure) {
      configure.call(this, ns);
    }
  });
};

module.exports = KtApplication;
