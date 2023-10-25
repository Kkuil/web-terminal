const JWT = require("jsonwebtoken")

module.exports = {
    // 生成token
    generator: function (value, secret, expiresIn) {
        return JWT.sign(value, secret, { expiresIn })
    },
    // 验证token
    verify: function (token, secret) {
        // 异常捕获
        try {
            return JWT.verify(token, secret)
        } catch (e) {
            console.log(e)
        }
    }
}