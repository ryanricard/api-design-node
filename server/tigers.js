// TODO: make a new router for the tigers resource
// and make some REST routes for it, exactly like for lions
// make a middleware that just logs the word 'tiger' to the console
// when a request comes in to the server

var tigerRouter = require('express').Router();

tigerRouter.use(function(req, res, next) {
  console.log('tiger');
  next();
});

tigerRouter.get('/', function(req, res) {
  res.send();
});

module.exports = tigerRouter;
