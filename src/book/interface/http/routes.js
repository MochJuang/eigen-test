let express = require('express');
let bookControlller = require('./controller/book-controller')

let router = express.Router();

router.get('/api/books', bookControlller.getAllBooks)

module.exports = router