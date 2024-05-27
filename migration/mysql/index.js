const config = require('../../config/mysql');
const Sequelize = require('sequelize');

// import migration data
const members = require('./member');
const books = require('./book');
const borrows = require('./borrow');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    dialectOptions: {
        multipleStatements: true
    },
    pool: config.pool,
    port: config.PORT,
    operatorAliases: false,
});

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.members = members(sequelize, Sequelize);
db.books = books(sequelize, Sequelize);
db.borrows = borrows(sequelize, Sequelize);

// setup relationship
db.members.hasMany(db.borrows, { onUpdate: "CASCADE", onDelete: "SET NULL" });
db.books.hasMany(db.borrows, { onUpdate: "CASCADE", onDelete: "SET NULL" });
db.borrows.belongsTo(db.members)
db.borrows.belongsTo(db.books)

db.init = () => {
    db.sequelize.sync()

    // mock
    // const mock = require('./mock')
    // mock(db)
    //     .then(() => console.log('mock completed'))
}

module.exports = db;