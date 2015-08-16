expect = require('chai').expect

describe 'Kt', ->
  Kt = require '..'
  it 'should export everything', ->
    expect(Kt.Application).to.be.ok
    expect(Kt.Router).to.be.ok
    expect(Kt.exts).to.be.ok
    expect(Kt.RequireCache).to.be.ok
