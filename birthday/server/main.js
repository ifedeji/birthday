import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
let Birthday = new Meteor.Collection('birthday');
if (Meteor.isServer) {
    // server code goes here
    Birthday.insert({
        firstName: "name",
        /*lastName: "",
        email: "",
        date: Date,
        comments: ""*/
    });
}

