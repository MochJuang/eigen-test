module.exports = (sequelize, Sequelize) => sequelize.define('borrows', {
    totalDaysReturn: {
        type: Sequelize.INTEGER
    },
    returnTimestamps: {
        type: Sequelize.DATE,
        allowNull: true
    },
})