module.exports = (sequelize, Sequelize) => sequelize.define('books', {
    code: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    stock: {
        type: Sequelize.INTEGER
    },
})