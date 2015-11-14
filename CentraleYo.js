Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics

if(Meteor.isServer) { 
	Meteor.publish("compteur", function() {
		return Compteur.find({});
	});
}
 
if (Meteor.isClient) {
	Meteor.subscribe("compteur");
	
	Template.body.helpers({
		counter: function () {
		return Compteur.findOne().compt;
		}
	});

	Template.body.helpers({
		counterOver: function(value) { //regarde si le nb de clics > value
			return Compteur.findOne().compt > value;
		}
	});

	Template.body.events({ //on appelle la méthode increment pour incrémenter le compteur
		"click button": function () {
			Meteor.call("increment"); 
		}
	});
}

Meteor.methods({ 
	increment: function(){
		var count = Compteur.findOne().compt;
		Compteur.update({}, { $set: { compt: count+1}}); //on incrémente le compteur
	}
});
