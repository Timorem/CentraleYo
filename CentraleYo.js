Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics

Router.route('home', {path:'/'});
Router.route('admin', {path:'/adminyo'});

Router.configure({
	loadingTemlate:'loading'
})

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
    },
    config:function(){
        ServiceConfiguration.configurations.remove({service:'myecp'})

        ServiceConfiguration.configurations.insert({
            service:'myecp',
            appId:'44_4a0dp01spse804ok4kwc44ccc0w8000sc0ocog8w8cc48040c0',
            secret:"4v0puc9sdh8gs4k8wsscw4gkggw0ocwks84os4s8kgkoosw4wo"
        });

    }
});


if(Meteor.isServer) { 
	if (!Compteur.findOne())
	{
		Compteur.insert({compt:0, etat:0});
	}

	Meteor.publish("compteur", function() {
		return Compteur.find({});
	});
    Meteor.publish("userData", function () {
        return Meteor.users.find({_id: this.userId});
    });
    Meteor.call("config");
}
 
if (Meteor.isClient) {
	Push.enabled(true);
	Meteor.subscribe("compteur");
    Meteor.subscribe("userData");

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

			Compteur.find().observeChanges({
				changed:function(id, fields)
				{
					template.clock.setValue(fields.compt);
				}
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
        isConnected :function(){
            return Meteor.userId();
        },
        userName : function(){
            return Meteor.user().services.myecp.first_name;
        },

	});


	Template.Home.events({ //on appelle la méthode increment pour incrémenter le compteur
		"click .neb" : function (event, template) {
			Meteor.call("increment", function(error, result)
			{
				template.clock.setValue(result)
			});
		},
		"click #myecp-login": function(event, template){
			Meteor.loginWithMyECP({loginStyle: "redirect"}, function(err){
				if (err) {
					throw new Meteor.Error(err);
				} else {
					throw new Meteor.Error("LOL");
				}});
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
		},
		"submit .adminform":function(event){
			event.preventDefault();
			Meteor.call("serverNotification", event.target.textarea.value, "Centrale YO");
		}
	});
}