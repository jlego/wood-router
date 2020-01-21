// 路由基类
// by YuRonghui 2018-11-15
const multipart = require('connect-multiparty');
const router = require('express').Router();

class Router {
  constructor(controllerName, controllers) {
    this.controllerName = controllerName;
    this.controllers = controllers;
  }

  getRouter(){
    return router;
  }

  //捕捉async方法异常
  async _asyncWarpFun(...args) {
    const next = args[args.length-1];
    try {
      return Promise.resolve(this(...args)).catch(next);
    } catch(e) {
      next(e);
    }
  }

  _addRouter(method, argus){
    if(argus.length > 1){
      for(let i of argus) {
        if (!i) throw new Error(`路由:${argus[0]}下对应方法不存在,请检查`);
      }
      let pathMatch = argus.shift(),
        fun = argus.pop(),
        methodArr = ['get', 'post', 'put', 'delete'];
      if(this.controllerName && this.controllers && typeof fun === 'function'){
        fun = fun.bind(this.controllers.get(this.controllerName));
      }
      if(method === 'post') argus.unshift(multipart());
      if(methodArr.includes(method)) router[method](pathMatch, ...argus, this._asyncWarpFun.bind(fun));
    } else {
      throw new Error('没有实现路由对应的方法')
    }
  }

  get(...argus){
    this._addRouter('get', argus);
  }

  post(...argus){
    this._addRouter('post', argus);
  }

  put(...argus){
    this._addRouter('put', argus);
  }

  delete(...argus){
    this._addRouter('delete', argus);
  }
}

module.exports = Router;
