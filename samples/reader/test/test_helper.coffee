App = require('../lib/app')

app = process.app = App.create(
  sequelize: 'mysql://app:123456@172.16.16.129:3306/reader_sample_test'
)
