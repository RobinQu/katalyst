var App = require('./lib/app');

App.run({
  sequelize: 'mysql://app:123456@172.16.16.129:3306/reader_sample'
}, function () {
  console.log('app is up and running');
});
