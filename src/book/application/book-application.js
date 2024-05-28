const { RuntimeError } = require('../../../common/error/error')
const db = require('../../../migration/mysql/index')


const getAllBooks =  () => {
    return db.books.findAll()
}

module.exports = {
    getAllBooks,
}