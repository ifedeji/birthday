import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './accounts-base.js';
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Templat e.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/
Birthdays = new Mongo.Collection("info");

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("birthdays");
}

if (Meteor.isClient) {
    Template.body.helpers({
        birthdayList:  function() {
        	return Birthdays.find({},{
           sort: { createdAt: -1 },
                limit: 40
          })
        }
    });
}
Template.body.events({
            "submit .login": function(event) {
                var email = event.target.text.value;
                console.log(email)

                Meteor.call(email);

                event.target.text.value = "";
                return false;


            }
        })

Template.body.events({
            "submit .add": function(event) {
                var firstName = event.target.text.value;
                var lastName = event.target.text.value;
                var email = event.target.text.value;
                var birthdayDate = event.target.date.value;
                var comments = event.target.text.value;
                console.log(firstName)
                console.log(lastName)
                console.log(email)
                console.log(birthdayDate)
                console.log(comments)


                Meteor.call(firstName, lastName, email, birthdayDate, comments);

                event.target.text.value = "";
                return false;


            }
        })


