require('dotenv').config()

module.exports = {
    HOST: process.env.HOSTNAMEDB,
    USER: process.env.USERNAMEDB,
    PASSWORD: process.env.PASSWORDDB,
    DB: process.env.NAMEDB,
    PORT: process.env.PORTDB || 3306,
    dialect: 'mysql',
    // timeout request
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}