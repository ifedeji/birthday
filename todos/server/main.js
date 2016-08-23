import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

let Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');

if(Meteor.isServer){
    // server code goes here

    Todos.insert({
    name: "Walk the dog",
    completed: false,
    createdAt: new Date()
	}); 
 }


