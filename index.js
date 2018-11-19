/**
 * Wood Plugin Module.
 * by jlego on 2018-11-17
 */
const Router = require('./src/router');
const _routers = new Map();

module.exports = (app, config = {}) => {
  app.Router = function(controllerName){
    if(_routers.has(controllerName)){
      return _routers.get(controllerName);
    } else {
      let _router = new Router(controllerName, app._controllers);
      if(controllerName) app.Router.set(controllerName, _router);
      return _router;
    }
  }
  app.application.use('/', app.Router().getRouter());
  app.addProp('Router', app.Router);
  return app.Router;
}
