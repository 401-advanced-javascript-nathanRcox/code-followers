'use strict';

const API = require('./API');
//third party dependancies
const prompts = require('prompts');

const json = require('./code-followers.schema.json')


require('dotenv').config();
const server = require('./src/server');

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
