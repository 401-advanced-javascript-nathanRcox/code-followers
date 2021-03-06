'use strict';

const users = require('../users/user-model')

module.exports = async (req, res, next) => {

  try {
    console.log('BEARER-AUTH:', req.headers.authorization);
    if (!req.headers.authorization) { _authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }
}