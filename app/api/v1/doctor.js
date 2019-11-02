const Router = require("koa-router");
const { Doctor } = require("../../models/doctor");
const Auth = require("../../../middlewares/auth");
const {DoctorValidator} = require("../../validators/validator")

const router = new Router({
  prefix: "/api/v1/doctor"
});

router.get("/lastest", new Auth().m(), async ctx => {
    const doctor = await Doctor.findOne({
        order: [
            ['id','DESC']
        ]
    })
    ctx.body = {
        doctor
    }
});

router.post("/", new Auth().m(), async ctx => {
    const v = await new DoctorValidator().validate(ctx)
    await Doctor.create({
        nickname: v.get('body.nickname'),
        profile: v.get('body.profile')
    })
    throw new global.errs.Success()
});

module.exports = router;
