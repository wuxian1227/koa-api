const Router = require("koa-router");
const { User } = require("../../models/user");

const router = new Router({
  prefix: "/api/v1/user"
});

const { RegisterValidator } = require("../../validators/validator");

router.post("/register", async ctx => {
  const v = await new RegisterValidator().validate(ctx);

  const user = {
    nickname: v.get("body.nickName"),
    email: v.get("body.email"),
    password: v.get("body.password2")
  };
  await User.create(user);
  throw new global.errs.Success()
});

module.exports = router;
