/**
 * Wood Plugin Module.
 * by jlego on 2018-11-17
 */
const Router = require('./src/router');
const _routers = new Map();

module.exports = (app, config = {}) => {
  let router = function(controllerName){
    if(_routers.has(controllerName)){
      return _routers.get(controllerName);
    } else {
      let _router = new Router(controllerName, app._controllers);
      if(controllerName) _routers.set(controllerName, _router);
      return _router;
    }
  }
  app.application.use('/', router().getRouter());
  app.addAppProp('Router', router);
  return router;
}
