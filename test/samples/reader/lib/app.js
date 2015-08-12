var Kt = require('katalyst');


var Reader = Kt.Application.design('reader', __dirname, function () {
  this.compose({
    '/': '/posts'
  });
});

module.exports = Reader;
