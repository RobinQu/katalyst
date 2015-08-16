expect = require('chai').expect
co = require('co')

before((done)->
  process.app.bootstrap(done)
  )

describe 'UserService', ->
  it 'should register user', (done)->
    US = process.app.require('service/user')
    data =
      name: 'jack' + Date.now(),
      password: 'rose'
    co(->
      user = yield US.create(data)
      found = yield US.findUserByLogin(data)
      expect(found).to.be.ok
      expect(found.name).to.equal(data.name)
      yield found.destroy()
      done()
      ).catch(done)
