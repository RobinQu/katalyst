module.exports = function (app) {
  return function *(next) {
    if(this.session.user) {
      this.state.user = this.session.user;
      this.ns.set('user', yield app.require('model/user').findById(this.session.user.id));
    }
    yield next;
  };
};
