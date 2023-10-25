const Sequelize = require("sequelize")
const MySequelize = new Sequelize("db_web-terminal", "root", "wwq5714806", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 20,
        min: 3,
        idle: 1000 //最长等待时间，单位为毫秒
    }
})
module.exports = MySequelize