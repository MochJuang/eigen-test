const migration = require('./migration/mysql');
const app = require('./src/http');
require('dotenv').config()

function init() {
    migration.init()
    app.listen(process.env.PORT, () => console.log('server running on port http://localhost:' + process.env.PORT))

}

init()