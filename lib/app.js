var _ = require('lodash');
// var KtCell = require('./cell');
var debug = require('catlog')('katalyst:host');
var assert = require('assert');
var fs = require('fs');
var ap = require('koa-app-party');

var KtApplication = ap.Container.extend(function () {
  debug('init');
  this.kt = true;
  this.type = 'KtHost';
});

var proto = KtApplication.prototype;

_.extend(proto, require('./engine'));

KtApplication.design = function (name, home, configure) {
  assert(name, 'should provide name');
  assert(home, 'should provide home path');
  assert(fs.statSync(home).isDirectory(), 'should provide path of a directory as home path');
  return ap.Container.design.call(this, name, function (ns) {
    this.home = home;
    if(configure) {
      configure.call(this, ns);
    }
  });
};

module.exports = KtApplication;
