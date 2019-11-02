const {LinValidator,Rule} = require('../../core/lin-validator-v2')

const {User} = require('../../app/models/user')
const {LoginType} = require('../lib/enum')

class PositiveIngegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt','请输入正整数',{min: 1})
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '邮箱格式不符合规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                max: 32,
                min: 6
            }),
            new Rule('matches', '密码不符合规范', '(?=.*[0-9])(?=.*[a-zA-Z]).{6,32}')
        ]
        this.password2 = this.password1
        this.nickName = [
            new Rule('isLength', '昵称至少4个字符，最多32个字符', {
                max: 32,
                min: 4
            })
        ]
    }

    validatePassword(vals) {
        const pas1 = vals.body.password1
        const pas2 = vals.body.password2
        if(pas1 !== pas2) {
            throw new Error('两个密码不相等')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(user) {
            throw new Error('邮箱已存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '账号不符合规则',{
                max: 32,
                min: 4
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '最小6位字符', {
                min: 6,
                max: 128
            })
        ]
    }

    validateLoginType(vals) {
        if(!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isLoginType(vals.body.type)) {
            throw new Error('type不合法')
        }
    }
}

class NoEmptyValidator extends LinValidator {
    constructor(){
        super()
        this.token = [
            new Rule('isLength', 'token不能为空', {
                min: 1
            })
        ]
    }
}

class DoctorValidator extends LinValidator {
    constructor() {
        super()
        this.nickname = [
            new Rule('isLength', '昵称至少1个字符，最多32个字符', {
                max: 32,
                min: 1
            })
        ]
        this.profile = [
            new Rule('isLength', '简介不能为空', {
                min: 1
            })
        ]
        this.avatar = [
            new Rule('isLength', '头像不能为空', {
                min: 1
            }) 
        ]
    }
}

class OrderValidator extends LinValidator {
    constructor() {
        super()
        this.status = [
            new Rule('isLength', 'status不能为空', {
                min: 1
            })
        ]
    }
}

module.exports = {
    PositiveIngegerValidator,
    RegisterValidator,
    TokenValidator,
    NoEmptyValidator,
    DoctorValidator,
    OrderValidator
}