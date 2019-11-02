module.exports = {
    env: 'dev',
    db: {
        dbName: 'xier',
        user: 'root',
        password: '01384154Zc',
        port: 3306,
        host: 'localhost'
    },
    secret: {
        key: 'abcdfsdf',
        expiresIn: 60 * 60 * 24 * 1
    },
    wx: {
        appId: 'wx1db97bf7b7016d48',
        appSecret: 'b9d1e93ab6cd1a861dd40c58242c077c',
        getOpenIdUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid={0}&secret={1}&js_code={2}&grant_type=authorization_code'
    }
}