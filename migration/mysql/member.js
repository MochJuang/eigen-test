module.exports = (sequelize, Sequelize) => sequelize.define('members', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {type: Sequelize.STRING},
    penalties_until: {type: Sequelize.DATETIME, allowNull: true},
}, {freezeTableName: true, timestamps: true, createdAt: true, updatedAt: true})