const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {ResponseError} = require('../common/error/error')
const cors = require('cors')
const memberRoutes = require('./member/interface/http/routes')
const bookRoutes = require('./book/interface/http/routes')
const borrowRoutes = require('./borrow/interface/http/routes')
const responseTime = require("response-time");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    next();
});

app.options("*", cors()); // include before other routes

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(responseTime(function(req, res, time) {
    console.log(req.method+' '+req.url)
}))

app.use(borrowRoutes)
app.use(bookRoutes)
app.use(memberRoutes)

app.use(async(err, req, res, next) => {
    if (!err) {
        next();
        return;
    }
    if (err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        }).end();
    }  else {
        res.status(500).json({
            errors: err.message
        }).end();
    }
})

module.exports = app;


