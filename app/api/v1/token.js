const Router = require("koa-router");
const { LoginType } = require("../../lib/enum");
const { User } = require("../../models/user");
const Auth = require("../../../middlewares/auth");
const { WxManager } = require("../../service/wx");
const { NoEmptyValidator } = require("../../validators/validator");

const router = new Router({
  prefix: "/api/v1/token"
});

const { TokenValidator } = require("../../validators/validator");

const { generateToken } = require("../../lib/utils");

router.post("/", async ctx => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get("body.type")) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(v.get("body.account"), v.get("body.secret"));
      break;
    case LoginType.USER_MINI_PROGRAM:
      token = await WxManager.codeToUser(v.get("body.account"));
      break;
    default:
      throw new global.errs.ParameterException("没有相应处理函数");
  }

  ctx.body = {
    token
  };
});

router.post("/verify", async ctx => {
  const v = await new NoEmptyValidator().validate(ctx);
  const result = Auth.verifyToken(v.get('body.token'))
  ctx.body = result
});

async function emailLogin(email, password) {
  const user = await User.verifyEmailAndPassword(email, password);
  const token = generateToken(user.id, Auth.USER);
  return token;
}

module.exports = router;
