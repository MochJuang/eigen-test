let express = require('express');
let memberControlller = require('./controller/member-controller')

let router = express.Router();

router.get('/api/members', memberControlller.getAllMembersWithTotalBookHasBorrowed)

module.exports = router