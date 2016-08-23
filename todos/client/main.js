import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
/*
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});*/
let Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');

if (Meteor.isClient) {
    // client code goes here
       Template.todos.helpers({
    'todo': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList, createdBy: currentUser }, {sort: {createdAt: -1}})
    }
});

}

// $('[name="todoName"]').val('');
Template.addTodo.events({
   'submit form': function(event){
    event.preventDefault();
    var todoName = $('[name="todoName"]').val();
    var currentList = this._id;
    Todos.insert({
        name: todoName,
        completed: false,
        createdAt: new Date(),
        createdBy: currentUser,
        listId: currentList
    });
    $('[name="todoName"]').val('');
}

});

Template.todoItem.events({
    // events go here
    'click .delete-todo': function(event) {
        event.preventDefault();
        var documentId = this._id;
        var confirm = window.confirm("Delete this task?");
        if (confirm) {
            Todos.remove({ _id: documentId });
        }
    },
    'keyup [name=todoItem]': function(event) {
        if (event.which == 13 || event.which == 27) {
            console.log("You tapped the Return or Escape key");
        } else {
            var documentId = this._id;
            var todoItem = $(event.target).val();
            Todos.update({ _id: documentId }, { $set: { name: todoItem } });
        }
    },
    'change [type="checkbox"]': function() {
        var documentId = this._id;
        var isCompleted = this.completed;
        if (isCompleted) {
            Todos.update({ _id: documentId }, { $set: { completed: false } });
            console.log("Task marked as incomplete.");
        } else {
            Todos.update({ _id: documentId }, { $set: { completed: true } });
            console.log("Task marked as complete.");
        }
    }
});
    Template.todosCount.helpers({
    'totalTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList }).count();
    },
    'completedTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList, completed: true }).count();
    }
});
Template.todoItem.helpers({
    'checked': function() {
        var isCompleted = this.completed;
        if (isCompleted) {
            return "checked";
        } else {
            return "";
        }
    }
});


Template.lists.helpers({
    'list': function(){
        return Lists.find({ createdBy: currentUser }, {sort: {name: 1}})
    }
});

Router.route('/register');
Router.route('/login');
Router.route('/', {
    name: 'home',
    template: 'home'
});
 Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        return Lists.findOne({ _id: currentList });
    }
  });

Router.configure({
    layoutTemplate: 'main'
});

Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
        email: email,
        password: password
         }, 
         function(error) {
        if (error) {
            console.log(error.reason); // Output error if registration fails
        } else {
            Router.go("home"); // Redirect user if registration succeeds
        }
  });


        Accounts.createUser({
            email: email,
            password: password
        });
        Router.go('home');
    }
});



Template.addList.events({
  'submit form': function(event){
    event.preventDefault();
    var listName = $('[name=listName]').val();
    var currentUser = Meteor.userId();
    Lists.insert({
        name: listName,
        createdBy: currentUser
    }, function(error, results){
        Router.go('listPage', { _id: results });
    });
    $('[name=listName]').val('');
}
});

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
                Meteor.logout();
                Router.go('login');
    }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
                console.log(error.reason);
            } else {
                Router.go("home");
            }

        });

    }
});


