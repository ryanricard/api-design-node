module.exports = function(err, req, res, next) {
  if (err) {
    res.status(500).send('Whoops! Something went wrong.');
  }
};