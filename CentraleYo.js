Tasks = new Mongo.Collection("tasks");
 
if (Meteor.isClient) {
  Session.set("counter", 0);
  // This code only runs on the client
  Template.body.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.body.helpers({
    counterOver: function(value) {
      return Session.get("counter") > value;
    }
  });

  Template.body.events({
    "click button": function () {
     Session.set("counter", Session.get("counter") + 1);
    }
  });
}