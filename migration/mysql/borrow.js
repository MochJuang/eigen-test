module.exports = (sequelize, Sequelize) => sequelize.define('borrows', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    total_day_return: {
        type: Sequelize.INTEGER
    },
    return_timestamps: {
        type: Sequelize.DATE,
        allowNull: true
    },
})