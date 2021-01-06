'use strict';


const API = require('./API');

//third party dependancies
const prompts = require('prompts');

require('dotenv').config();

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
  server.start(process.env.PORT);
}
catch(error) {
    console.error('Could not start up server: ', error);
}

const json = require('./code-followers.schema.json')

const server = require('./src/server');

let node = API.root;

let response = {};
response.value = {}
//response.type = null;
response.value.description = "You’ve just lost your job to the effects of a global pandemic, which has closed borders, shops, gyms, restaurants, and schools for the foreseeable future. The country has come together to protect the vulnerable and support the unemployed, so you’ve got time to pursue a career pivot. What’ll it be?";

function getTitles (currentNode){
  if (!currentNode) throw new Error;
  let arrayOfTitles = [];
  if (currentNode.left) arrayOfTitles.push({title: currentNode.left.name, description:currentNode.left.description, value: currentNode.left, type: currentNode.left.type});
  if (currentNode.right) arrayOfTitles.push({title: currentNode.right.name, description:currentNode.right.description, value: currentNode.right, type: currentNode.right.type});
  console.log(arrayOfTitles);
  return arrayOfTitles;
}
 


(async () => {

  while (true) {
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
  //console.log(`This is the response message:"${response.value.description}".`)
  node = response.value;
  // console.log(`This is the id of what the user picked ${response.value.value}`);
  // console.log(`This is the left node's id: ${node.left.value}`);
  // console.log(`This is the right node's id: ${node.right.value}`);
}

})();





// const questions = [
//   {
//     type: 'select',
//     name: 'gameStart prompt 1',
//     message: json.story[0].description,
//     choices: [
//       { title: 'Coding', value: 'Coding' },
//       { title: 'Acting', value: 'Acting' }
//     ]
//   },
  
//   {
//     type: prev => prev == 'Coding' ? 'select' : null,
//     name: 'Coding 1 prompt 2',
//     message: 'You decide to code. Now that you’ve made the choice to learn to code, you must choose between learning independently or attending a bootcamp. Which do you choose?',
//     choices: [
//       { title: 'Study independently', value: 'Study independently' },
//       { title: 'Attend a bootcamp', value: 'Attend a bootcamp' }
//     ]
//   },
//     {
//       type: prev => prev ==  ? 'select' : null,
//       name: 'Coding 1 prompt 3',
//       message: 'you are in prompt 3 coding ind res',
//       choices: [
//         { title: 'sell kidney' },
//         {title: 'bootcamp'}
//       ]
//     },
//     {
//       type: prev => prev == 1 ? 'select' : null,
//       name: 'Coding 2',
//       message: 'you are in prompt 3 coding bootcamp res',
//       choices: [
//         { title: 'sell chocolate' },
//         {title: 'bootcamp'}
//       ]
//     },
//   {
//     type: prev => prev == 1 ? 'select' : null,
//     name: 'Acting 1',
//     message: 'you’ve always dreamt of becoming an actor, but dreams won’t tile your floors, let alone vacuum them. Now you have to act! What will you do first? A:  B: Join your community’s theater troupe',
//     choices: [
//       { title: 'Move to NYC to go to acting school' },
//       { title: 'Join your community’s theater troupe' }
//     ]
//   },
//     {
//       type: prev => prev == 0 ? 'select' : null,
//       name: 'Acting 2',
//       message: 'you are in prompt 2 Acting res',
//       choices: [
//         { title: 'sell kidney' },
//         {title: 'bootcamp'}
//       ]
//     },
//     {
//       type: prev => prev == 1 ? 'select' : null,
//       name: 'Acting 2',
//       message: 'you are in prompt 2 Acting res',
//       choices: [
//         { title: 'sell chocolate' },
//         {title: 'bootcamp'}
//       ]
//     }

// ];
 
// (async () => {
//   const response = await prompts(questions);
//   console.log(response)
// })();




server.start(process.env.PORT);
