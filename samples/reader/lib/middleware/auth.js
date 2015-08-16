module.exports = function (app) {

  return function *(next) {
    if(this.session.user) {
      return yield next;
    }
    this.redirect('/login');
  };

};
