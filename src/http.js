const express = require('express')
const app = express()
const responseTime = require('response-time')
const bodyParser = require('body-parser')
require('dotenv').config()

const memberRoutes = require('./member/interface/http/routes')

exports.init = () => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
        next();
    });

    app.use(bodyParser.json({
        limit: '50mb'
    }));

    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 50000
    }));

    app.use(responseTime(function(req, res, time) {
        console.log(req.url)
    }))

    app.listen(process.env.PORT, () => console.log('server running on port http://localhost:' + process.env.PORT))

}


