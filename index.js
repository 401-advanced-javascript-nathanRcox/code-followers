'use strict';


const API = require('./API');

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
try{
  mongoose.connect(process.env.MONGODB_URI, options);

  // Start the web server
  //server.start(process.env.PORT);
}
catch(error) {
    console.error('Could not start up server: ', error);
}

const server = require('./src/server');

let node = API.root;

let response = {};
response.value = {}
//response.type = null;
response.value.description = "You’ve just lost your job to the effects of a global pandemic, which has closed borders, shops, gyms, restaurants, and schools for the foreseeable future. The country has come together to protect the vulnerable and support the unemployed, so you’ve got time to pursue a career pivot. What’ll it be?";

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




function signin(){
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
    try{
      const response = await prompts(signinQuestions);
      const results = await superagent.post(`https://code-followers-dev.herokuapp.com/signin`)
      .auth(response.username, response.password)
      token = results.body.user.token
      console.log(`${response.username}, you have successfully logged in!`)

      renderGame();
    }
    catch{
      (e => console.error('this is an error!', e))
    }
   })();
}
 
function signup(){
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
    .then(results => {console.log(`Welcome, ${response.username}!`)})
    .catch(e => console.error('this is an error!', e))
    renderGame();
   })();
}


 function renderGame(){
   (async () => {
     while (true) {
       console.log(`-----------------------------------`)
     response = await prompts({
         type: 'select',
         //type: node.type,
         name: 'value',
         message: response.value.description,
         //message: node.description,
         choices: getTitles(node),
     });
     if (!response.value.left && !response.value.right) {
       console.log(response.value.description);
       break;
     }
     node = response.value;
   }
   
   })();



 }


 
 module.exports = {getTitles, renderGame, signin, signup};
 server.start(process.env.PORT);
