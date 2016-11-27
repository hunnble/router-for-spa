var HashRouter = new Router();

function changeContent (content) {
  var app = document.querySelector('#app');
  app.innerHTML = content;
}

HashRouter.route('/', function () {
  changeContent('主页');
});
HashRouter.route('/a', function () {
  changeContent('a页');
}, {
  onEnter: function () {console.log('onEnter /a');},
  onLeave: function () {console.log('onLeave /a');}
});
HashRouter.route('/b', function () {
  changeContent('b页');
  HashRouter.require('./a.js', function () {
    console.log('加载完毕');
  });
});
