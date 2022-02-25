
var express = require('express');
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const path = require('path');
var usersRouter =require('./routes/userapi');
const apiErrorHandler = require('./middleware/error/errorhandling')

var app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());




app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/users/", usersRouter)

app.use(apiErrorHandler)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
});

module.exports = app;