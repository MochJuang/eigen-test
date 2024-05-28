let express = require('express');
let memberBorrowController = require('./controller/member-borrow-book')

let router = express.Router();

router.post('/api/borrow', memberBorrowController.borrowingBook)
router.patch('/api/return',memberBorrowController.returnBook)


module.exports = router