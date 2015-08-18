var https = require('https');

var Utils = module.exports = {};

Utils.serverAddress = function(server){
  var addr = server.address();
  if (!addr) {
    return null;
  }
  var port = server.address().port;
  var protocol = server instanceof https.Server ? 'https' : 'http';
  return protocol + '://127.0.0.1:' + port;
};
