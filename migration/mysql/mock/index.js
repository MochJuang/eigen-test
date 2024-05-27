const bookMock = require("./book-mock");
const memberMock = require("./member-mock");
module.exports = async (db) => {
    const bookMock = require('./book-mock');
    const memberMock = require('./member-mock');

    await bookMock(db)
    await memberMock(db)
}