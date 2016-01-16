Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics

if(Meteor.isServer) { 
	if (!Compteur.findOne())
	{
		Compteur.insert({compt:0, etat:0});
	}

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
		etat: function () {
		return Compteur.findOne().etat;
		}
	});


	Template.body.helpers({
		counterOver: function(value) { //regarde si le nb de clics > value
			return Compteur.findOne().compt >= value;
		}
	});

	Template.body.helpers({
		counterInbetween: function(valueinf, valuesup, etat) { //regarde si le nb de clics > value
			return (Compteur.findOne().compt >= valueinf) && (Compteur.findOne().compt < valuesup) && (Compteur.findOne().etat == etat);
		}
	});
	Template.body.helpers({
		counterExact: function(value, etat) { //regarde si le nb de clics = value
			return Compteur.findOne().compt == value;
		}
	});

	Template.body.events({ //on appelle la méthode increment pour incrémenter le compteur
		"click .neb": function () {
			Meteor.call("increment");
		}
	});

	Template.body.events({
			"click .raz": function() {
			Meteor.call("raz");
		}
	});
}

Meteor.methods({ 
	increment: function(){
		var count = Compteur.findOne().compt;
		var valueEtat = Compteur.findOne().etat;

		if (count == 30 && valueEtat == 0)
		{
			valueEtat = 1;
			count = 0;
		}
		else if (count == 20 && valueEtat == 1)
		{
			count = 0;
			valueEtat = 2;
		}
		else if (count == 100 && valueEtat == 2)
		{
			count = 0;
			valueEtat = 0;
		}
		else
		{
			count++;
		}

		Compteur.update({}, { $set: { compt: count, etat:valueEtat}}); //on incrémente le compteur
	},
	raz: function(){
		Compteur.update({}, { $set: { compt: 0, etat:0}}); //on incrémente le compteur
	}
});
