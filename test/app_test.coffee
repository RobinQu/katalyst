Kt = require '..'
expect = require('chai').expect
request = require('supertest')
sinon = require 'sinon'
Promise = require 'bluebird'

describe 'KtApplication', ->
  App = Kt.Application

  describe 'create', ->
    it 'should be created with default members', ->
      app = App.create(
        name: 'niceapp',
        home: __dirname
      )
      expect(app.name).to.equal('niceapp')
      expect(app.home).to.equal(__dirname)

  describe 'design', ->

    it 'should design', ->
      App.design 'ok', __dirname

    it 'should require a name as first argument', ->
      expect(->
        App.design ->
        ).to.throw('should provide name')

    it 'should require a valid path string as second argument', ->
      expect(->
          App.design 'good', 'not_exist'
        ).to.throw('should provide path of a directory as home path')

    it 'should inject home path to namespace', (done)->
      app = App.design('nice', __dirname, (ns)->
        this.use(->
          this.body = this.ns.get('home')
          yield return
          )
      ).create()
      expect(app.home.toString()).to.equal(__dirname)

      app.listen(->
        request(this)
        .get('/')
        .expect(200)
        .end(done)
        )

  describe 'engine', ->
    fs = require 'fs'
    path = require 'path'
    app = App.create(
      name: 'niceapp',
      home: __dirname
    )

    it 'should stat a file inside project', ->
      stub1 = sinon.stub(fs, 'statSync')
      stub1.returnsArg(0)
      stub2 = sinon.stub(app, 'resolve')
      stub2.returnsArg(0)
      expect(app.stat('anyway')).to.equal('anyway')
      expect(stub1.calledOnce).to.be.true
      expect(stub2.calledOnce).to.be.true
      stub1.restore()
      stub2.restore()

    it 'should resolve', ->
      stub1 = sinon.stub(path, 'resolve')
      stub1.returnsArg(1)
      expect(app.resolve('file1')).to.equal('file1')
      expect(stub1.firstCall.args[0]).to.equal(__dirname)
      expect(stub1.firstCall.args[1]).to.equal('file1')
      expect(app.resolve('file1.js')).to.equal('file1')
      stub1.restore()

    describe 'require', ->


      it 'should load and only once', ->
        stub1 = sinon.stub(app, '_require')
        stub2 = sinon.stub()
        stub2.returns('anyway')
        stub1.returns(stub2)
        expect(app.require('anyway')).to.equal('anyway')
        expect(app.require('anyway')).to.equal('anyway')
        expect(stub2.firstCall.args[0]).to.equal(app)
        expect(stub1.callCount).to.equal(1)
        stub1.restore()

      it 'should accept a custom loader', ->
        stub1 = sinon.stub(app, '_require')
        stub1.returnsArg(0)
        stub2 = sinon.stub(app, 'resolve')
        stub2.returnsArg(0)
        loader = sinon.stub()
        loader.returnsArg(0)
        expect(app.require('test', loader)).to.equal('test')
        expect(loader.callCount).to.equal(1)
        expect(loader.firstCall.args[0]).to.equal('test')
        stub1.restore()
        stub2.restore()

    it 'should run glob', (done)->
      data1 = ['a.js', 'b.js']
      stub1 = sinon.stub(app, '_glob')
      stub1.returns(Promise.resolve(data1))
      app.glob('folder1').then((files)->
        expect(files).to.deep.equal(data1)
        expect(stub1.calledOnce).to.be.true
        expect(stub1.firstCall.args[0]).to.equal('**/*.js')
        expect(stub1.firstCall.args[1].cwd).to.equal(__dirname + '/folder1')
        done()
        ).catch(done).finally(->
          stub1.restore()
        )


    describe 'batchRequire', ->
      it 'should load all', (done)->
        stub1 = sinon.stub(app, 'glob')
        stub1.returns(Promise.resolve(['a.js', 'b.js', 'index.js']))
        stub2 = sinon.stub(app, 'require')
        stub2.returnsArg(0)
        app.batchRequire('folder1').then((result)->
          expect(result).to.be.ok
          expect(Object.keys(result).length).to.equal(2)
          for k, v of result
            expect(v).to.equal("folder1/#{k}")
          done()
          ).finally(->
          stub1.restore()
          stub2.restore()
          )

    describe 'inject', ->

      it 'should load files in extention folder', ->
        ext1 = sinon.spy()
        ext2 = sinon.stub()
        spy = sinon.spy(app, 'ext')
        ext2.returns(Promise.resolve('async'))
        stub1 = sinon.stub(app, 'batchRequire', (name)->
            if name is 'extension'
              Promise.resolve({
                "a.js": ext1,
                "b.js": ext2
              })
            else
              Promise.resolve({})
          )
        app.inject(app.ns()).then(->
          expect(ext1.callCount).to.equal(1)
          expect(ext1.firstCall.args[0]).to.equal(app)
          # expect(Object.keys(app.extensions).length).to.equal(2)
          # expect(spy.callCount).to.equal(2)
          ).finally(->
            stub1.restore()
            app.extensions = {}
            )
