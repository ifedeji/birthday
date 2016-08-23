import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});
Birthdays = new Mongo.Collection("info");

Meteor.methods({
    employeeDetails: function(fName, lName, email, bdate) {
        // if(! Meteor.userId()){
        // throw new Meteor.Error("not-authorized");
        //}
        console.log(message)

        Birthdays.insert({
        	firstName: fName,
        	lastName: lName,
        	email: email,
        	birthdayDate: bdate

        })
    }

})
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("birthdays", function() {
    	

        return Birthdays.find({}, {
            sort: { createdAt: -1 },
            limit: 40
        });
    })
}
