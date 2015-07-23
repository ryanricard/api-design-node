var express = require('express');
var app = express();
var api = require('./api/api');
var errorHandler = require('./middleware/errorHandler');

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api/', api);
// set up global error handling

// handle errors
app.use(errorHandler);

// export the app for testing
module.exports = app;
