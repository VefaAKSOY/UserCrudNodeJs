var express = require('express');
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const path = require('path');

var app = express();
var usersRouter =require('./routes/userapi.js');
app.use("/api/users", usersRouter)

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    req.headers['Content-Type'] =  'application/json'
  })


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;