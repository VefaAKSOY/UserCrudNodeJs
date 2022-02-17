var express = require('express');
var api = require('./routes/userapi.js');
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser');;
var logger = require('morgan')
const path = require('path');


var usersRouter = require('./routes/userapi.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',usersRouter);


module.exports  = app;