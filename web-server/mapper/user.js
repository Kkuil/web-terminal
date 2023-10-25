const User = require("../model/User")
const Sequelize = require("sequelize")
const Op = require("sequelize").Op
const { v4: uuidV4 } = require("uuid")

exports.login = async ({ username, password }) => {
    return await User.findOne({
        where: Sequelize.and({ username }, { password }),
        raw: true
    })
}