'use strict';
//server constants
const express = require('express');
const app = express(); 
const notFoundHandler = require('./error-handlers/404')



app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});


module.exports = {
  server: app,
  start: port => {
    if(!port) { throw new Error('port missing');}
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  },
};
