# katalyst

[![Build Status](https://travis-ci.org/RobinQu/katalyst.svg)](https://travis-ci.org/RobinQu/katalyst)


Fullstack, highly scalable web frameworks, based on koa.

## Usage

`Kt.Application` is a subclass of `Container` from [RobinQu/koa-app-party](https://github.com/RobinQu/koa-app-party).

```
var Kt = require('katalyst');
var App = Kt.Application.design('myapp', __dirname, function(ns) {
  //setup namespace, mount subapps, etc
});
```

### Exporting objects

`katalyst` introduces the notion of home root. Modules or objects can be accessed by `app.require` method.

Define an object in `object.js`:

```
// object.js
module.exports = funciton(app) {

};
```

Require this object using:

```
//object is the extension name of
app.require('object')
```

### Project structure

A `katalyst` application should have its own project structure.

#### Extensions

A Extension is a larger component than middleware. In fact, it's often comprised of setup of multiple middlewares.

* Extensions can be async functions that returns a promise
* Export the extensions just like other objects in the project

```
module.exports = function(app) {
  var ns = app.ns();
  var options = ns.get('options');
  var conn = require('mysql').connect(options.mysql);
  ns.set('conn', conn);
  app.use(function *() {
    doSomethingWithMysql(this.ns.get('conn'));
  });
};
```

## TODO

* More test cases
* Docs

## License

MIT
