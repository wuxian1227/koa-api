function isLoginType(val) {
    return Object.values(LoginType).includes(val)
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_PASSWORD: 102,
    ADMIN_EMAIL: 200,
    isLoginType
}

module.exports = {
    LoginType
}