const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");

class Auth {
  constructor(level) {
    this.level = level || 1;
    Auth.USER = 8;
    Auth.ADMIN = 16;
  }
  m() {
    return async (ctx, next) => {
      const token = basicAuth(ctx.req);
      let errMsg = "token不合法";
      if (!token || !token.name) {
        throw new global.errs.Forbidden(errMsg);
      }
      let decode;
      try {
        decode = jwt.verify(token.name, global.config.secret.key);
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          errMsg = "token已过期";
        }
        throw new global.errs.Forbidden(errMsg);
      }

      if (decode.scope < this.level) {
        errMsg = "权限不够";
        throw new global.errs.Forbidden(errMsg);
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      };
      await next();
    };
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.config.secret.key);
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = Auth;
