import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Messages = new Mongo.Collection("msgs");

Meteor.methods({
    sendMessage: function(message, name) {
        // if(! Meteor.userId()){
        // throw new Meteor.Error("not-authorized");
        //}
        console.log(message)

        Messages.insert({
            text: message,
            owner: Meteor.userId(),
			username: Meteor.user().username,
        })
    }

})


if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("messages", function() {
    	

        return Messages.find({}, {
            sort: { createdAt: -1 },
            limit: 5
        });
    })
}

 