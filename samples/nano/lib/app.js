var Kt = require('katalyst');

var App = module.exports = Kt.Application.design('nano', __dirname);

if(module === require.main) {
  App.run(function () {
    console.log('Server is up and running at', Kt.utils.serverAddress(this));
  });
}
