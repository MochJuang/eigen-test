module.exports = (sequelize, Sequelize) => sequelize.define('members', {
    code: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    penalties_until: {
        type: Sequelize.DATE,
        allowNull: true
    },
})