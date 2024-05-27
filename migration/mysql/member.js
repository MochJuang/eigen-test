module.exports = (sequelize, Sequelize) => sequelize.define('members', {
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    penaltiesUntil: {
        type: Sequelize.DATE,
        allowNull: true
    },
})