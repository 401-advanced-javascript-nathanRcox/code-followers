'use strict';

db.categories.insertMany( [
    { _id: "Books", parent: 0, left: 1, right: 12 },
    { _id: "Programming", parent: "Books", left: 2, right: 11 },
    { _id: "Languages", parent: "Programming", left: 3, right: 4 },
    { _id: "Databases", parent: "Programming", left: 5, right: 10 },
    { _id: "MongoDB", parent: "Databases", left: 6, right: 7 },
    { _id: "dbm", parent: "Databases", left: 8, right: 9 }
 ] )

 //query 
 db.categories.find().sort( { path: 1 } )