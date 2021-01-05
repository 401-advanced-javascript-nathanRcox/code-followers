// 'use strict';

// // The API for this project could look like a binary tree:
// // tree: { 
// //   stageOne: 
// // }

// // The constructor for each node of the binary tree.
// class Node {
//   constructor(value = 0, left = null, right = null) { 
//     this.value = value;
//     this.left = left;
//     this.right = right;
//   };
// }

// class BinaryTree {
//   constructor() {
//     this.root = null;
//   };

//   // Define a method named add that accepts a value, and adds a new node with that value in the correct location in the binary search tree: this one will make a BST and may only accept integers.
//   add(value) {
//     if(typeof value !== 'number') {
//       return null;
//     }

//     if(!this.root) {
//       this.root = new Node(value);
//       return;
//     }

//     let _insert = (node) => {
//       if(value < node.value) {
//         if(node.left === null) {
//           node.left = new Node(value);
//           return;
//         } else if (node.left !== null) {
//           return +_insert(node.left);
//         }
//       } else if(value >= node.value) {
//         if(node.right === null) {
//           node.right = new Node(value);
//           return;
//         } else if (node.right !== null) {
//           return _insert(node.right);
//         }
//       }
//     }
//     _insert(this.root);
//   }


// // This function will create a binary search tree, so the nodes need to be created in the order that the stages will connect.

// // This is what the collections for the MongoDB could look like.

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



