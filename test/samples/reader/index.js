var App = require('./lib/app');

App.run({
  sequelize: 'mysql://app:123456@localhost:3306/reader_sample'
}, function () {
  console.log('app is up and running');
});
