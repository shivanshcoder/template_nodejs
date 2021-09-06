var createError = require('http-errors');
var express = require('express');
var path = require('path');

const dotenv = require("dotenv");
const cors = require('cors');

var app = express();

dotenv.config();

const db = require("./config/database")


db.authenticate().then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.log("Error: " + err);
})

db.sync().then().catch((err)=>console.log("Error: "+err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


app.use(express.json(), cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
