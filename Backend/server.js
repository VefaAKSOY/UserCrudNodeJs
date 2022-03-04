
var express = require('express');
var cookieParser = require('cookie-parser')
const path = require('path');
var usersRoutes =require('./routes/usersroutes');
const apiErrorHandler = require('./middleware/error/errorhandling')
const companiesRoutes = require('./routes/companiesroutes');
const cors = require("cors");


var app = express();

var corsOption = {
  origin: "http://localhost:3001"
}

app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());




app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/users/", usersRoutes)
app.use("/api/companies/", companiesRoutes)

app.use(apiErrorHandler)

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
});

module.exports = app;