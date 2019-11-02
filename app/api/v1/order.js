const Router = require('koa-router')
const Auth = require('../../../middlewares/auth')

const router = new Router({
    prefix: '/api/v1/order'
})

const {Order} = require('../../models/order')

const {OrderValidator} = require('../../validators/validator')

router.get('/',new Auth().m(), async (ctx) =>{
    const data = await Order.getCurrentOrderStatus(ctx.auth.uid)
    throw new global.errs.Success(data)
})

router.post('/preorder',new Auth().m(), async (ctx) => {
    const v = await new OrderValidator().validate(ctx)
    const status = v.get('body.status')
    const uid = ctx.auth.uid
    const cure = v.get('body.cure')
    const data = await Order.preOrder(uid, cure, status)

    throw new global.errs.Success(data)
})

module.exports = router