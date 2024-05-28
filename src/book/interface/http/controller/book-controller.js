const db = require("../../../../../migration/mysql");
const bookInfrastructure =  require('../../../application/book-application')
const getAllBooks = async (req, res, next) => {
    try {
        const result = await bookInfrastructure.getAllBooks()
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}


module.exports = {
    getAllBooks
}