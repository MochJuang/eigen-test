module.exports = (sequelize, Sequelize) => sequelize.define('borrows', {
    total_day_return: {
        type: Sequelize.INTEGER
    },
    return_timestamps: {
        type: Sequelize.DATE,
        allowNull: true
    },
})