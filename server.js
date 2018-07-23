//require and configure dotenv
require('dotenv').config();
//import required modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./app_api/models/users');
var passport = require('passport');
var db_url = process.env.DB_HOST;
var port = process.env.PORT || 3001;

// Bring in the routes for the API (delete the default routes)
var routesApi = require('./app_api/routes/index');
var app = express();

//this will let us get data from the request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

//serve static files
app.use(express.static(__dirname + '/app_client'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
//serving index.html on all the incoming http requests 
app.get('/:var(login|register|forgot-password|forgot-password/confirmation|reset-password/*|profile|home)', function (req, res) {
  res.sendFile(__dirname + '/app_client/index.html');
});

//define MongoDB database URL
var mongodbUri = process.env.DB_HOST;
mongoose.connect(mongodbUri);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, "connection error"));
conn.on('open', () => {
  console.log("Connected to database");
  //if connected to db, then start the app, listening on given port
  app.listen(port);
  console.log("listening on " + port);
});

//The config should be required after the model is required, as the config references the model.
require('./app_api/config/passport');

//Initialise Passport as Express middleware just before the API routes are added
app.use(passport.initialize());
app.use('/api', routesApi);

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message + "."
    });
  }
});

//If uncaughtException occurs, then the Nodejs App crash is prevented and an error log is printed in the console
process.on('uncaughtException', function (err) {
  console.log(err);
});
