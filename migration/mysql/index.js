const config = require('../../config/mysql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: {
        multipleStatements: true
    },
    pool: config.pool,
    port: config.PORT,
    operatorAliases: false,
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.members = require("./member")(sequelize, Sequelize);