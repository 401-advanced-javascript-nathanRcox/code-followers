'use strict';
//server constants
require('dotenv').config();
const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
const notFoundHandler = require('./error-handlers/404');
const authRoute = require('../routes/routes');
const logger = require('../middleware/logger');

app.use(logger);
app.use(express.json());
app.use(authRoute);

app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.use('*', notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    if(!port) { throw new Error('port missing');}
    app.listen(port, () => {
      //console.log(`listening on ${port}`);
    });
  },
};
