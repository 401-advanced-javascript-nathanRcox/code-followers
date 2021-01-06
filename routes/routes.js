'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../users/user-model');
const basicAuth = require('../middleware/basic')
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

//sign in w/ bearer token created when user signed up
authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

// Update a user's profile with score and location (level). 
authRouter.put('/update-score', async (req, res, next) => {
  console.log('REQ.BODY:', req.body);
  let scoreAndLocation = req.body;
  // const updateRecord = await 
})


module.exports = authRouter;
