let express = require('express');
let bookControlller = require('./controller/member-borrow-book')

let router = express.Router();

router.get('/api/books', bookControlller.getAllBooks)

module.exports = router