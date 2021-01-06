'use strict';

const API = require('./API');
const server = require('./src/server');

//third party dependancies
const prompts = require('prompts');
require('dotenv').config();
const superagent = require('superagent');

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

//Connect to the Mongo DB
try { mongoose.connect(process.env.MONGODB_URI, options) }
catch(error) { console.error('Could not start up server: ', error) }

function getTitles (currentNode){
  if (!currentNode) throw new Error;
  let arrayOfTitles = [];
  if (currentNode.left) arrayOfTitles.push({title: currentNode.left.name, value: currentNode.left, type: currentNode.left.type});
  if (currentNode.right) arrayOfTitles.push({title: currentNode.right.name, value: currentNode.right, type: currentNode.right.type});
  //console.log(arrayOfTitles);
  return arrayOfTitles;
}
 
(async () => {
  const response = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Do you want to sign up or sign in?',
    initial: true,
    active: 'sign up',
    inactive: 'sign in'
  });
  if (response.value === false){
    signin();
  } else if (response.value === true){
    signup();
  }
})();

function signin() {
const signinQuestions = [
  {
    type: 'text',
    name: 'username',
    message: 'What is your username?'
  },
  {
    type: 'password',
    name: 'password',
    message: 'What is your password?'
  },
];
  let token;
  (async () => {
    try {
      const response = await prompts(signinQuestions);
      const results = await superagent.post(`https://code-followers-dev.herokuapp.com/signin`)
      .auth(response.username, response.password);
      token = results.body.user.token;
      console.log(`${response.username}, welcome back!`);

      renderGame();
    }
    catch {
      (e => console.error('this is an error!', e))
    };
   })();
}
 
function signup() {
  const signupQuestions = [
    {
      type: 'text',
      name: 'username',
      message: 'What is your username?'
    },
    {
      type: 'password',
      name: 'password',
      message: 'What is your password?'
    },
  ];
  (async () => {
    const response = await prompts(signupQuestions);
    await superagent.post(`https://code-followers-dev.herokuapp.com/signup`)
    .send(response)
    .then(results => {console.log(`Welcome, ${results.username}!`)})
    .catch(e => console.error('This is an error!', e))
    console.log('------------------------')
    renderGame();
   })();
}

function tallyScore(counter) {
  let score = counter.toString();
  console.log('SCORE:', score);
  superagent.put(`https://code-followers-dev.herokuapp.com/update-score`)
  .send(score)
  .then(results => console.log('RESULTS:', results))
  .catch(e => console.error('You\'re not getting there.'));
};

function playAgain() {
  (async () => {
    const response = await prompts({
      type: 'toggle',
      name: 'value',
      message: 'Do you want to play again',
      initial: true,
      active: 'yes',
      inactive: 'no'
    });
    if (response.value === false){
      tallyScore(counter);
      console.log('Thanks for playing! Exit by typing control+c.');
    } else if (response.value === true){
      renderGame();
    }
  })()
}
let counter = 0;

 function renderGame(){
  let node = API.root;
  // let counter = 0;
  let response = {};
  response.value = {}
  response.value.description = "You’ve just lost your job to the effects of a global pandemic, which has closed borders, shops, gyms, restaurants, and schools for the foreseeable future. The country has come together to protect the vulnerable and support the unemployed, so you’ve got time to pursue a career pivot. What’ll it be?";
   (async () => {
     while (true) {
       console.log(`-----------------------------------`)
      response = await prompts({
      type: 'select',
      name: 'value',
      message: response.value.description,
      choices: getTitles(node),
     });
     if (response.value.status === 'win') {
      console.log(`You've chosen wisely. You've won a point, and your current score is ${++counter}.`)
    } else if (response.value.status === 'lose') {
      console.log(`You've chosen poorly. You've lost a point, and your current score is ${--counter}.`);
    };
     if (!response.value.left && !response.value.right) {
      console.log(response.value.description);
      if (counter >= 2) console.log(`You've won(!) with a final score of ${counter}.`)
      else console.log(`You've lost(!) with a final score of ${counter}.`);
      break;
    };
     node = response.value;
   }
   playAgain();
  })();
}

server.start(process.env.PORT);
