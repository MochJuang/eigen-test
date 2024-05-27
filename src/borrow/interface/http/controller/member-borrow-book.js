const memberBorrowBookApplication = require('../../../application/member-borrow-book')

const borrowingBook = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await memberBorrowBookApplication.borrowingBook(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const returnBook = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await memberBorrowBookApplication.returnBook(request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

module.exports =  {
    borrowingBook,
    returnBook
}