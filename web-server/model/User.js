const Sequelize = require("sequelize")
const MySequelize = require("../config/mysqlConfig")
const User = MySequelize.define(
    "user",
    {
        id: {
            type: Sequelize.STRING(45),
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(45),
            allowNull: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = User