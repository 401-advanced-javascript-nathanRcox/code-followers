'use strict';

// The API for this project could look like a binary tree:
// tree: { 
//   stageStart: {
//       value: 0,
//       description: 'description',
//       left: { this.left },
//       right: { thi.right }
//    } 
// }

// The constructor for each node of the binary tree.
class Node {
  constructor(value, type = null, name, status, description, left = null, right = null) { 
    this.value = value; // This is the node's 'id,' e.g. root = 
    this.type = type; // Will be 'select' for all but the leaves.
    this.name = name;
    this.description = description;
    this.left = left;
    this.right = right;
    // this.answers = [ 
    //   { value: this.left},
    //   { value: this.right }
    // ];
    this.status = status;
  };
}

class BinaryTree {
  constructor() {
    this.root = null;
  };

  // Define a method named add that accepts a value, and adds a new node with that value in the correct location in the binary search tree: this one will make a BST and may only accept integers.
  add(value, type, name, status, description) {
    if(typeof value !== 'number') {
      return null;
    }

    if(!this.root) {
      this.root = new Node(value, type, name, status, description);
      return;
    }

    let _insert = (node) => {
      if(value < node.value) {
        if(node.left === null) {
          node.left = new Node(value, type, name, status, description);
          return;
        } else if (node.left !== null) {
          return +_insert(node.left);
        }
      } else if(value >= node.value) {
        if(node.right === null) {
          node.right = new Node(value, type, name, status, description);
          return;
        } else if (node.right !== null) {
          return _insert(node.right);
        }
      }
    }
    _insert(this.root);
  }
}

// constructor(value, type = null, name, status, description) { 

let API = new BinaryTree;
API.add(15, 'select', 'Start', 'win', 'You’ve just lost your job to the effects of a global pandemic, which has closed borders, shops, gyms, restaurants, and schools for the foreseeable future. The country has come together to protect the vulnerable and support the unemployed, so you’ve got time to pursue a career pivot. What’ll it be?');

API.add(13, 'select', 'Coding', 'win', 'Now that you’ve made the choice to learn to code, you must choose between learning independently or attending a bootcamp. Which do you choose?');

API.add(23, 'select', 'Acting', 'win', 'You’ve always dreamt of becoming an actor, but dreams won’t tile your floors, let alone vacuum them. Now you have to act! What will you do first?');

API.add(3, 'select', 'Independent study', 'win', 'Although you’ve discovered Code Fellows, you go against your better judgement and decide to watch YouTube videos all day and end up on the dark web selling a kidney because a bootcamp feels like too much of an investment. Do you reconsider a bootcamp or blow the kidney money on more Udemy courses?');

API.add(11, 'select', 'Bootcamp', 'win', 'You discover Code Fellows while spending five hours a day lying in bed on Instagram. Do you want to find a new career and a new community of amazing people, as well as develop the most in-demand skills available? Yes or no?');

API.add(19, 'select', 'Acting school in NYC', 'win', 'With a dream in your heart and a spring in your step, you move to the Big Apple to make it big! You need a day job in the meantime. What do you choose?');

API.add(27, 'select', 'Community Theater', 'win', 'You join your local theater troupe. What they lack in funding, they more than make up for in jazzhands! Which role do you audition for first?');

API.add(1, 'select', 'Independent study', 'lose', 'You kept your Udemy courses up for exactly three days. With now only one kidney, your options are online poker and actually learning to code.');

API.add(5, 'select', 'Bootcamp', 'win', 'You were recommended to Code Fellows by an alumnus, but you need to decide between the full-time and the night tracks.');

API.add(9, 'select', 'No', 'lose', 'You saw an amazing mime act on the subway and decided to start filming. Do you try to make a living creating a YouTube channel or are you now inspired to paint your face, become a clown, and run off with the circus because you regret not learning software development.');

API.add(13, 'select', 'Yes', 'win', 'Although your hands are trembling and your eye is twitching from drinking three pots of coffee, you wrote one line of JavaScript without using Google and you’ve caught the coding bug. You can continue learning JavaScript and to become a full-stack developer or learn Python and become a back-end developer because you can’t handle the freedom and democratic nature of JavaScript.');

API.add(17, 'select', 'Miming', 'lose', 'Your mom always said you had expressive eyes, so you start up a mime act in the subway, only to realize that you’re SO good, nobody can see you and you make no money. Do you keep on keepin’ on or do you move back in with Mom?');

API.add(21, 'select', 'Waiting tables', 'lose', 'Going with what you know, you get a job waiting tables at a greasy all-night diner in Bed Stuy. Unfortunately for you, drunk diner-goers aren’t much for tipping, your studies are suffering, and you didn’t get the lead in Wicked. Heartbroken and running quickly out of money, you have to decide between taking out a soul-crushing student loan to continue your acting studies in NYC or to use that soul-crushing loan to pursue a more pragmatic career in a less expensive location?');

API.add(25, 'select', 'Wicked', 'lose', 'Flying monkey #2 in Wicked. You could really bring something special to that role. However, your talents go unrecognized and you are offered a stagehand position. Do you take it?');

API.add(29, 'select', 'The Sound of Music', 'lose', 'Fraulein Maria in The Sound of Music. You were the best singer in your high school, after all. No one appreciates true talent, apparently, and you are offered the role of Brigitta instead. Do you take it?' );

API.add(0, null, 'Poker', 'lose', 'Poker: You lost the poker tournament and are now out of money (but you have an abundance of snacks and toilet paper), so you turn to your new dark web hacking skills to get paid as an FBI informant to uncover black market organ sales rings. Sounds like a good gig, right? And you congratulate yourself up until the point that you’re poisoned by your mark and die an ignominious death a la the HBO show Chernobyl.');

API.add(2, null, 'Independent study', 'win', 'Good choice! With your new coding skills, you go on to create a new-age social media platform called myFace, buy out Mark Zuckerburg, and achieve world domination, having beaten Elon Musk at being the first to colonize Mars.');

API.add(4, null, 'Nights', 'win', 'Nights: You become fully nocturnal, develop a sensitivity to light, and can no longer determine whether you are still human or if you have metamorphosed into an owl. Either way, though, who cares? With your new coding skills, you go on to create a new-age social media platform called myFace, buy out Mark Zuckerburg, and achieve world domination, having beaten Elon Musk at being the first to colonize Mars.');

API.add(6, null, 'Days', 'win', 'You have lost track of where you are, which planet you live, and what month or year it is, but you have successfully built 4 applications and have made a host of new like-minded friends!');

API.add(8, null, 'YouTube', 'lose', 'You take a part-time job creating mime career tutorials in hopes of selling them to the vast market of mime hopefuls via your new YouTube channel.');

API.add(10, null, 'Circus clown', 'win', 'You meet your future spouse stuffed in a tiny clown car and live happily ever after. Your child chooses not to follow in your footsteps and becomes a trillionaire tech investor.');

API.add(12, null, 'JavaScript', 'win', 'You graduate from Code Fellows and pass every whiteboard interview at Amazon, becoming its next sensation and giving Jeff Bezos a new reason to find it hard to sleep at night.');

API.add(14, null, 'Python', 'win', 'You graduate from Code Fellows and pass every whiteboard interview at Amazon, becoming its next sensation and giving Jeff Bezos a new reason to find it hard to sleep at night. ');

API.add(16, null, 'Dream on', 'lose', 'You’ve dreamed a dream in time gone by, and you’re unwilling to let it go. Plus, your Mom’s basement just flooded. So, you decide to give it one more go, and you get the lead in Les Mis, only to be outshone by your understudy, who steals the show after you miss the whole first week because your roommate’s boyfriend’s mother tested positive for COVID. You realize it’s time to reconsider your career path and follow a more pragmatic passion. How about coding?');

API.add(18, null, 'Move home', 'win', 'You’ve got to know when to fold ‘em, and you’ve given it the ol’ college try, so you take a step back and a deep breath and ask your mom to take you back while you go through a coding bootcamp and chart a more practical trajectory.');

API.add(20, null, 'Soul-crushing loan A', 'win', 'You were born for the stage! It would be a shame not to invest in your craft! You use the loans to quit working and allow you to focus full-time on your studies. One day, you’ll make it big!');

API.add(22, null, 'Soul-crushing loan B', 'win', 'You move back in with your mom in South Jersey and use your loan to pay for a coding bootcamp. Look at you, being all responsible!');

API.add(24, null, 'Yes', 'win', 'Yes! Who knows--maybe one of the actors will get sick and you will be called on as their understudy? The show must go on!');

API.add(26, null, 'No', 'win', 'No. This is a sign that your talent will never be appreciated. You instead channel your creativity into a coding bootcamp.');

API.add(28, null, 'Yes', 'lose', 'Yes! Who knows--maybe one of the actors will get sick and you will be called on as their understudy? The show must go on!');

API.add(30, null, 'No', 'win', 'No. This is a sign that your talent will never be appreciated. You instead channel your creativity into a coding bootcamp.');

module.exports = API;

// console.log('API:', API);

// This is what the collections for the MongoDB could look like.

// const nodeSchema = mongoose.Schema({
//   _id: { type: String, required: true },
//   chapter: { type: String, required: true },
//   win: { type: Boolean, required: true },
//   leftChild: { type: Object, required: false },
//   rightChild: { type: Object, required: false }
// });

// const userSchema = mongoose.Schema({
//   userID: { type: String, required: true },
//   username: { type: String, required: true },
//   game_id: { type: String, required: false },
// });



