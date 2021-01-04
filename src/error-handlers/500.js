'use strict';

function serverError(err, req, res, next) {
  res.status(500).send('server error', err)
}
module.exports = serverError;