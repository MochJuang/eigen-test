module.exports = (sequelize, Sequelize) => sequelize.define('books', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
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