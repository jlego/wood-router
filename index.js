/**
 * Wood Plugin Module.
 * by jlego on 2018-11-17
 */
const Router = require('./src/router');

module.exports = app => {
  app._routers = app._routers || new Map();
  app.Router = function(controllerName){
    if(app._routers.has(controllerName)){
      return app._routers.get(controllerName);
    } else {
      let _router = new Router(controllerName, app._controllers);
      if(controllerName) app._routers.set(controllerName, _router);
      return _router;
    }
  }
  app.application.use('/', app.Router().getRouter());
  return app.Router;
}
