module.exports = (sequelize, Sequelize) => sequelize.define('members', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    penalties_until: {
        type: Sequelize.DATE,
        allowNull: true
    },
})