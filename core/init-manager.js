const requireDirectory = require("require-directory");
const Router = require('koa-router')


class InitManager {
  static initCore(app) {
    InitManager.app = app;
    InitManager.initRouters();
    InitManager.initHttpExceptions()
    InitManager.initConfig()
  }

  static initConfig() {
    const directory = `${process.cwd()}/config/config`
    const config = require(directory)
    global.config = config
  }

  static initRouters() {
    const directory = `${process.cwd()}/app/api`  
    requireDirectory(module, directory, {
      visit: callback
    });

    function callback(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }
  
  static initHttpExceptions() {
    const errors = require('./http-exception')
    global.errs = errors
  }
}

module.exports = InitManager;
