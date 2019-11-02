const axios  = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../lib/utils')
const Auth = require('../../middlewares/auth')

class WxManager {
    static async codeToUser(code) {
        const appId = global.config.wx.appId
        const appSecret = global.config.wx.appSecret
        const getOpenIdUrl = global.config.wx.getOpenIdUrl
        const url = getOpenIdUrl.replace('{0}',appId).replace('{1}',appSecret)
        .replace('{2}',code)
        const result = await axios.get(url)
        if(result.status !== 200) {
            throw new global.errs.AuthFailed('获取token失败')
        }
        if(result.data.errcode) {
            throw new global.errs.AuthFailed('token校验失败')
        }
        const openid = result.data.openid

        let user = await User.getUserByOpenId(openid)
        if(!user) {
            user = await User.createUser(openid)
        }
        const token = generateToken(user.id, Auth.USER)
        return token
    }
}

module.exports = {
    WxManager
}