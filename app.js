const migration = require('./migration/mysql');
const http = require('./src/http');

function init() {
    migration.init()
    http.init()
}

init()