var crypto = require('crypto');

module.exports = function generate(app) {
  var SupportedAlgorithm = ['sha1', 'md5', 'base64'];
  app.ns().set('supported', []);
  app.use(function *() {
    var input = this.query.input;
    var alg = this.query.alg;
    this.assert(input && alg, 400, 'should provide input content and algorithm');
    var hash;
    switch(alg) {
      case 'md5':
      hash = crypto.createHash('md5');
      hash.update(input, 'utf8');
      this.body = hash.digest('hex');
      break;
      case 'sha1':
      hash = crypto.createHash('sha1');
      hash.update(input, 'utf8');
      this.body = hash.digest('hex');
      break;
      case 'base64':
      this.body = (new Buffer(input)).toString('base64');
      default:
      this.status = 400;
      this.body = 'unsupported algorithm ' + alg;
    }
  });
};
