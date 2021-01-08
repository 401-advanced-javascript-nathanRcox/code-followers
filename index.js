'use strict';

//requiring API server and user model
const API = require('./API');
const server = require('./src/server');
const users = require('./users/user-model');

//third party dependancies
const prompts = require('prompts');
require('dotenv').config();
const superagent = require('superagent');

// Database
const mongoose = require('mongoose');
const { response } = require('express');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.set('useFindAndModify', false); // This removes the notice of deprecation of findByIdAndUpdate.

//global variable
let counter = 0;

//Connect to the Mongo DB
try {
  mongoose.connect(process.env.MONGODB_URI, options);
} catch (error) {
  console.error('Could not start up server: ', error);
}

//render initial prompt
(async () => {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message:
      'Welcome to Code Followers, a text-based game of risk and reward. Before you can play, please sign in or sign up.',
    initial: true,
    active: 'sign in',
    inactive: 'sign up',
  });
  if (response.value === false) {
    signup();
  } else if (response.value === true) {
    signin();
  }
})();

function signin() {
  const signinQuestions = [
    {
      type: 'text',
      name: 'username',
      message: 'What is your username?',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
  ];
  let token;
  (async () => {
    try {
      const response = await prompts(signinQuestions);
      const results = await superagent
        .post(`https://code-followers.herokuapp.com/signin`)
        .auth(response.username, response.password);
      token = results.body.user.token;
      console.log(`${response.username}, you have successfully logged in!`);
      let userId = results.body.user._id;
      renderGame(userId);
    } catch {
      e => console.error('this is a sign-in error!', e.message);
    } finally {
      if (!token) {
        console.log('incorrect login. Press CTRL + C to retry');
      }
    }
  })();
}

function signup() {
  const signupQuestions = [
    {
      type: 'text',
      name: 'username',
      message: 'What is your username?',
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?',
    },
  ];

  (async () => {    //  await superagent.post(`http://localhost:${process.env.PORT}/signup`)
    const response = await prompts(signupQuestions);
    await superagent
      .post(`https://code-followers.herokuapp.com/signup`)
      .send(response)
      .then(results => {
        console.log(`Welcome, ${results.body.user.username}!`);
        let userId = results.body.user._id;
        renderGame(userId);
      })
      .catch(e => console.error('This is a sign-up error!', e.message));
  })();
}

function getTitles(currentNode) {
  if (!currentNode) throw new Error();
  let arrayOfTitles = [];
  if (currentNode.left)
    arrayOfTitles.push({
      title: currentNode.left.name,
      value: currentNode.left,
      type: currentNode.left.type,
    });
  if (currentNode.right)
    arrayOfTitles.push({
      title: currentNode.right.name,
      value: currentNode.right,
      type: currentNode.right.type,
    });
  return arrayOfTitles;
}

async function tallyScore(counter, userId) {
  // await superagent.put(`http://localhost:${process.env.PORT}/update-score/${userId}`)
  await superagent
    .put(`https://code-followers.herokuapp.com/update-score/${userId}`)
    .send({ counter })
    .catch(e => console.error(e.message, 'Your score is unavailable.'));
}

function renderGame(userId) {
  let node = API.root;
  let response = {};
  response.value = {};
  response.value.description =
    'You’ve just lost your job to the effects of a global pandemic, which has closed borders, shops, gyms, restaurants, and schools for the foreseeable future. The country has come together to protect the vulnerable and support the unemployed, so you’ve got time to pursue a career pivot. What’ll it be?';

  (async () => {
    while (true) {
      console.log(`-----------------------------------`);
      response = await prompts({
        type: 'select',
        name: 'value',
        message: response.value.description,
        choices: getTitles(node),
      });
      if (response.value.status === 'win') {
        console.log(
          `You've chosen wisely. You've won a point, and your current score is ${++counter}.`
        );
      } else if (response.value.status === 'lose') {
        console.log(
          `You've chosen poorly. You've lost a point, and your current score is ${--counter}.`
        );
      }
      if (!response.value.left && !response.value.right) {
        console.log(response.value.description);
        if (counter >= 2)
          console.log(`You've won(!) with a final score of ${counter}.`);
        else console.log(`You've lost(!) with a final score of ${counter}.`);
        break;
      }
      node = response.value;
    }
    playAgain(userId);
  })();
}

function playAgain(userId) {
  (async () => {
    const response = await prompts({
      type: 'toggle',
      name: 'value',
      message: 'Do you want to play again',
      initial: true,
      active: 'yes',
      inactive: 'no',
    });

    if (response.value === false) {
      tallyScore(counter, userId);
      console.log('Thanks for playing! Exit by typing control+c.');
    } else if (response.value === true) {
      tallyScore(counter, userId); // This could be a high-score counter.
      renderGame(userId);
    }
  })();
}

module.exports = { getTitles, renderGame, signin, signup };

server.start(process.env.PORT || 3000);
