Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics

Router.route('home', {path:'/'});
Router.route('admin', {path:'/adminyo'});


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
	Push.enabled(true);
	Meteor.subscribe("compteur");
	Template.registerHelper('counter', function () {
			return Compteur.findOne().compt;
		});
	Template.registerHelper('etat', function () {
			return Compteur.findOne().etat;
		});

	Template.Home.onRendered(function()
		{
			var template = this;
			Meteor.call("getCounter", function(error, result)
			{
				template.clock = new FlipClock($('.clock'), result, {
					clockFace: 'Counter'
				});
			});
		}
	);

	Template.Home.helpers({
		counterOver: function(value) { //regarde si le nb de clics > value
			return Compteur.findOne().compt >= value;
		},
		counterInbetween: function(valueinf, valuesup, etat) { //regarde si le nb de clics > value
			return (Compteur.findOne().compt >= valueinf) && (Compteur.findOne().compt < valuesup) && (Compteur.findOne().etat == etat);
		},
		counterExact: function(value, etat) { //regarde si le nb de clics = value
			return Compteur.findOne().compt == value;
		},

	});

	Template.Home.events({ //on appelle la méthode increment pour incrémenter le compteur
		"click .neb" : function (event, template) {
			Meteor.call("increment", function(error, result)
			{
				template.clock.setValue(result)
			});
		}
	});

	Template.Admin.events({
		"click .neb" : function(event) {
			event.preventDefault();
			Meteor.call("increment");
		},
		"click .raz" : function (event) {
			event.preventDefault();
			Meteor.call("raz");
		}
	});
}

Meteor.methods({
	getCounter: function() {
		return Compteur.findOne().compt;
	},
	increment: function(){
		var count = Compteur.findOne().compt;
		var valueEtat = Compteur.findOne().etat;

		count++;
		Compteur.update({}, { $set: { compt: count, etat:valueEtat}}); //on incrémente le compteur
		return count;
	},
	raz: function(){
		Compteur.update({}, { $set: { compt: 0, etat:0}}); //on incrémente le compteur
	}
});
