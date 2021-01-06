'use strict';

const base64 = require('base-64');
const User = require('../users/user-model');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) { return _authError(); }

    let basic = req.headers.authorization.split(' ').pop();
    let [user, pass] = base64.decode(basic).split(':');


    req.user = await User.authenticateBasic(user, pass)
    next();
  } catch (error) {
    _authError()
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }

}