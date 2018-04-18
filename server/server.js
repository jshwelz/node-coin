var express = require('express');
var app = express();
var api = require('./api');
var config = require('./config/config');
require('mongoose').connect(config.db.url);
// setup the app middlware
require('./middleware/appMiddleware')(app);

// setup the api
app.use('/api', api);

module.exports = app;