 const {HttpException} = require('../core/http-exception')
 
 const catchException = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException) {
            ctx.body = {
                message: error.message,
                error_code: error.errorCode,
                url: `${ctx.method} ${ctx.path}`,
                attributes: error.data,
            }
            ctx.status = error.code
        }else {
            if(global.config.env === 'dev') {
                throw error
            }
            ctx.body = {
                message: 'we made a mistake',
                error_code: 999,
                url: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchException