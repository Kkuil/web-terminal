const UserMapper = require("../mapper/user")
const JWT = require("../utils/JWT")
const { LOGIN_SECRET, LOGIN_TTL } = require("../constant/auth")

exports.login = async ({ username, password }) => {
    const user = await UserMapper.login({ username, password })
    if (user) {
        // 生成token
        return JWT.generator({ username, password }, LOGIN_SECRET, LOGIN_TTL)
    }
}

exports.auth = async (token) => {
    // 验证token
    const info = JWT.verify(token, LOGIN_SECRET, LOGIN_TTL)
    console.log(info)
    if (info) {
        return info["username"]
    }
}
