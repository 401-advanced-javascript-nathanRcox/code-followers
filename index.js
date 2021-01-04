'use strict';

//third party dependancies
const prompts = require('prompts');


require('dotenv').config();
const server = require('./src/server');

(async () => {
  const response = await prompts({
    type: 'string',
    name: 'value',
    message: 'Hello new user! What is your name?',
  });
  console.log(response);
})();


server.start(process.env.PORT);
