const express = require("express")
const LoginService = require("../service/LoginService")
const router = express.Router()

router.post("/login", async function (req, res, next) {
    const token = await LoginService.login(req.body)
    if (token) {
        res.send({
            code: 200,
            data: token,
            message: "登录成功"
        })
    } else {
        res.send({
            code: 400,
            data: false,
            message: "登录失败"
        })
    }
})

module.exports = router
