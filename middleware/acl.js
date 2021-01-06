'use strict';

module.exports = (capability) => {

  return (req, res, next) => {
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      }
      else {
        _authError();
      }
    } catch (error) {
      _authError();
    }

    function _authError() {
      res.status(403).send('Invalid Login');
    }
  }
}