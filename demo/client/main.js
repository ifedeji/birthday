import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import './accounts-config.js';

/*Template.body.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
});

Template.body.helpers({
    counter() {
        return Template.instance().counter.get();
    },
    appName: "chitech's app",
    array: [1, 2, 3, 4, 5],
    arrayObj: [{ name: "chitech", email: "chitech@gmail.com" }, { name: "ife", email: "ife@gmail.com" }]
});

Template.body.events({
    'click button' (event, instance) {
        // increment the counter when button is clicked
        instance.counter.set(instance.counter.get() + 1);
    },
});*/

Messages = new Mongo.Collection("msgs");

if (Meteor.isClient) {
    // This code only runs on the client
    Meteor.subscribe("messages");
}

if (Meteor.isClient) {
    Template.body.helpers({
        recentMessages: function() {
            return Messages.find({});
        }
    });
}

/*Meteor.methods({
    sendMessage: function(message) {
        // if(! Meteor.userId()){
        // throw new Meteor.Error("not-authorized");
        //}
        console.log(message+"fhh")

        Messages.insert({
            text: message,
            createdAt: new Date(),
            username: "anonymous"
        })
    }

})*/

if (Meteor.isClient) {
    Template.body.helpers({
        recentMessages: function() {
            return Messages.find({}, {
                sort: { createdAt: -1 },
                limit: 5
            })

        }
    });


    Template.body.events({
            "submit .new-message": function(event) {
                var text = event.target.text.value;
                var name = event.target.name.value;

                console.log(text)

                Meteor.call('sendMessage', text, name);

                event.target.text.value = "";
                return false;


            }
        })
        //Accounts.ui.config({
        // passwordSignupFiels: "USERNAME-ONLY"	
        //})

}
