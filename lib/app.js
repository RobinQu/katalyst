var debug = require('catlog')('kt:host');
var assert = require('assert');
var fs = require('fs');
var ap = require('koa-app-party');

var KtApplication = ap.Container.extend(require('./engine'));

KtApplication.Type = 'KtApplication';

var proto = KtApplication.prototype;

var checkNameAndHome = function (name, home) {
  assert(name && typeof name == 'string', 'should provide name');
  assert(home, 'should provide home path');
  assert(fs.existsSync(home) && fs.statSync(home).isDirectory(), 'should provide path of a directory as home path');
};

KtApplication.design = function (name, home, configure) {
  checkNameAndHome(name, home);
  //call super
  return this.super_.design.call(this, name, function (ns) {
    this.home = home;
    this.name = name;
    ns.set('home', home);
    if(configure) {
      configure.call(this, ns);
    }
  });
};


module.exports = KtApplication;
