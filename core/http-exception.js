class HttpException extends Error {
    constructor(message="服务器错误", errorCode=10001, code=400) {
        super()
        this.message = message
        this.errorCode = errorCode
        this.code = code
    }
}

class ParameterException extends HttpException {
    constructor(message, errorCode, code) {
        super()
        this.message = message || "参数错误"
        this.errorCode = errorCode || 10002
        this.code = code || 400
    }
}

class Success extends HttpException {
    constructor(data, message, errorCode, code) {
        super()
        this.message = message || 'ok'
        this.errorCode = errorCode || 0
        this.code = code || 201
        this.data = data || null
    }
}

class AuthFailed extends HttpException {
    constructor(message, errorCode) {
        super()
        this.message = message || '授权失败'
        this.errorCode = errorCode || 10003
    }
}

class Forbidden extends HttpException {
    constructor(message, errorCode) {
        super()
        this.message = message || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    AuthFailed,
    Forbidden
}