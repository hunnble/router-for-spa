!function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Router = factory();
  }
}(typeof window !== 'undefined' ? window : this, function () {
  function Router (useHistory) {
    this.routes = {};
    this.currentUrl = '';
    this.requiredFile = null;
    // mode == 0 hash, mode == 1 history
    this.mode = useHistory ? 1 : 0;

    this.init();

  };

  Router.prototype.init = function (useHistory) {
    window.addEventListener('load', this.refresh.bind(this));
    window.addEventListener('hashchange', this.refresh.bind(this));
  };

  Router.prototype.route = function (path, callback, options) {
    path = path.replace(/\s*/g, '');
    if (callback && routerUtils.isFunc(callback)) {
      this.routes[path] = {
        callback: callback,
        fn: null,
        onEnter: (options && options.onEnter && routerUtils.isFunc(options.onEnter)) ? options.onEnter : null,
        onLeave: (options && options.onLeave && routerUtils.isFunc(options.onLeave)) ? options.onLeave : null
      };
    } else {
      throw new Error('callback of path ' + path + ' must be a function.');
    }
  };

  Router.prototype.refresh = function (hashEvent) {
    var body = document.getElementsByTagName('body')[0];
    var url = window.location.hash.slice(1) || '/';
    var route = this.routes[url];
    if (hashEvent.oldURL) {
      var oldHash = hashEvent.oldURL.split('#').reverse()[0];
      this.routes[oldHash].onLeave && this.routes[oldHash].onLeave();
    }
    if (this.requiredFile) {
      body.removeChild(this.requiredFile);
      this.requiredFile = null;
    }
    route.onEnter && route.onEnter();
    this.currentUrl = url;
    route.callback();
  };

  Router.prototype.require = function (file, callback) {
    var self = this;
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    script.async = true;
    script.onload = function () {
      self.requiredFile = script;
      callback();
    };
    body.appendChild(script);
  };

  var routerUtils = {
    isFunc: function (ele) {
      return Object.prototype.toString.call(ele) === '[object Function]';
    }
  };

  return Router;
});
