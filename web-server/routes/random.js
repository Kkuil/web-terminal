const express = require('express');
const router = express.Router();
const request = require('../utils/request')

// 随机4K背景图
router.get('/bg', async function (req, res, next) {
    const params = req.query
    if (!params.type) {
        res.send({
            code: 0,
            msg: '缺少参数type'
        }).status(400)
    } else {
        const {data} = await request({
            url: "https://v2.api-m.com/api/random4kPic",
            method: 'GET',
            params: {
                type: params.type
            }
        })
        if (data) {
            res.send({
                data
            }).status(200)
        }
    }
});

module.exports = router;
