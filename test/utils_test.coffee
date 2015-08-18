http = require 'http'
https = require 'https'
expect = require('chai').expect

describe 'Utils', ->
  Utils = require '../lib/utils'

  describe 'serverAddress', ->

    it 'should get server address', (done)->
      srv = http.createServer();
      srv.listen(6789, ->
        expect(Utils.serverAddress(srv)).to.equal('http://127.0.0.1:6789')
        this.close(done)
        )

    it 'should return null if server is not up', ->
      srv = http.createServer()
      expect(Utils.serverAddress(srv)).to.equal(null)
