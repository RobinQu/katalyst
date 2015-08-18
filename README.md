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

### Katalyst applications

#### Project layout

A `katalyst` application should have its own project structure. While it's possible to build a very large web application using `katalyst`, elastic nature of `katalyst` make it easy to setup lightweight applications swiftly.

Folder structure for a very simple app:

```
|____index.js
|____lib
| |____app.js
| |____controller
| | |____home.js
| | |____post.js
| |____extension
| | |____relation.js
| |____middleware
| | |____auth.js
| | |____view_model.js
| |____model
| | |____post.js
| | |____user.js
| |____router
| | |____home.js
| | |____post.js
| |____service
| | |____post.js
| | |____user.js
| |____util
| | |____logger.js
| |____view
| | |____home
| | | |____login.tpl
| | | |____register.tpl
| | |____layout
| | | |____default.tpl
| | |____post
| | | |_____post.tpl
| | | |____edit.tpl
| | | |____list.tpl
| | | |____new.tpl
| | | |____show.tpl
|____package.json
|____test
| |____functional
| | |____user_test.coffee
| |____test_helper.coffee
```

Like most MVC applications, it is made up with models, controllers, and views. `katalyst` introduces many new ingredients to the internal architecture that aims to decouple reusable components, like `extension` and `middleware`.

A even more simple app may have a minmal structure like this:

```
|____lib
| |____app.js
| |____extension
| | |____generate.js
|____package.json

```

Like racks in ruby, `Kt.Application` are mountable components. So a large application can be made up with a number of sub-apps which have project structures of there own.

For example:

```
|____index.js
|____lib
| |____app
| | |____repo
| | | |____index.js
| | |____web
| | | |____controller
| | | | |____repo.js
| | | |____index.js
| | | |____router
| | | | |____repo.js
| | | |____view
| | | | |____repo
| | | | | |____list.tpl
| |____index.js
|____package.json
```

This application has two sub-apps, each of which focus on its own isolated features.


#### Extensions

A Extension is a larger component than middleware. In fact, it's often comprised of setup of multiple middlewares.

* Extensions can be async functions that returns a promise
* Export the extensions just like other objects in the project
* Extensions are *automattically* loaded during the bootstrap phase

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

#### Namespace

Namespace is a concept introduced in [RobinQu/koa-app-party](https://github.com/RobinQu/koa-app-party).

Using namespace across multiple calls, including async ones, can be handy for

* Sharing or isolating objects
* Removing dependencies
* Improving code style

There are some pitfalls using a namespace, which will be detailed latter. However, the golden rule of writing applications with `katalyst` is always inject your objects into a namespace if possible instead of storing on the `app` or `app.context`.

## Examples

* [reader](samples/reader) A simple blog server to serve posts
* [giterver](samples/gitserver) A private git server over HTTP

## TODO

* More test cases
* Docs

## License

MIT
