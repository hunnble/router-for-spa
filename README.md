### router-for-spa
    A simple front end router.
#### Platform Support
This library can be used in the **browser** only.
#### Get the code
```javascript
npm install --save router-for-spa
```
#### Example(UMD, the module can be used in Node.js too)
##### example.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>example</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div id="app"></div>
    <a href="#/">index</a>
    <a href="#/a">a</a>
    <a href="#/b">b</a>
    <script src="../index.js"></script>
    <script src="./example.js"></script>
  </body>
</html>
```
##### example.js
```javascript
var HashRouter = new Router();

function changeContent (content) {
  var app = document.querySelector('#app');
  app.innerHTML = content;
}

HashRouter.route('/', function () {
  changeContent('index');
});
HashRouter.route('/a', function () {
  changeContent('a');
}, {
  onEnter: function () {console.log('onEnter /a');},
  onLeave: function () {console.log('onLeave /a');}
});
HashRouter.route('/b', function () {
  changeContent('b');
  HashRouter.require('./a.js', function () {
    console.log('done!');
  });
});

```
#### License
MIT
