Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics
Plat = new Mongo.Collection("plat"); //servira à contenir les plats
Pizza = new Mongo.Collection("pizza");

Router.route('home', {path:'/'});
Router.route('admin', {path:'/adminyo'});
Router.route('adminbar', {path:'/adminbar'});

Router.configure({
	loadingTemplate:'loading'
})

var isButtonEnabled = function()
{
	var resetDate = Compteur.findOne().resetDate;

	if (!resetDate)
		return Meteor.userId() && !Meteor.user().clickDate;

	return Meteor.userId() && (!Meteor.user().clickDate || Meteor.user().clickDate < resetDate);
};

Meteor.methods({
    getCounter: function() {
        return Compteur.findOne().compt;
    },
    increment: function(){
		if (!Meteor.userId())
			return;

		if (!isButtonEnabled())
			return;

		Meteor.users.update({_id:Meteor.user()._id}, {$set:{"clickDate":Date()}});
        var count = Compteur.findOne().compt;

        count++;
        Compteur.update({}, { $set: { compt: count}}); //on incrémente le compteur
        return count;
    },
    raz: function(){
		Compteur.update({}, {$set: {compt: 0, resetDate: Date()}}); //on incrémente le compteur
    },
    config:function(){
        ServiceConfiguration.configurations.remove({service:'myecp'})

        ServiceConfiguration.configurations.insert({
            service:'myecp',
            appId:'44_4a0dp01spse804ok4kwc44ccc0w8000sc0ocog8w8cc48040c0',
            secret:"4v0puc9sdh8gs4k8wsscw4gkggw0ocwks84os4s8kgkoosw4wo"
        });
    },
    checkPlat: function(platId, setChecked){
    	Plat.update(platId, { $set :{dispo: setChecked} });
    },
    checkPizza: function(pizzaId, setChecked){
    	Pizza.update(pizzaId, { $set :{dispo: setChecked} });
    }
});


if(Meteor.isServer) {
	Accounts.onCreateUser(function(options, user)
	{
		user.clickDate = null
		return user;
	});


	if (!Compteur.findOne())
	{
		Compteur.insert({compt:0, resetDate: Date()});
	}

	if (!Plat.findOne()){
		Plat.insert({name:"Tartiflette", dispo:false});
		Plat.insert({name:"Poulet Curry", dispo:false});
		Plat.insert({name:"Gnocci chevre epinard", dispo:false});
		Plat.insert({name:"Poulet pates champi", dispo:false});
		Plat.insert({name:"Risotto", dispo:false});
		Plat.insert({name:"Lasagne", dispo:false});
		Plat.insert({name:"Poulet basquaise", dispo:false});
		Plat.insert({name:"Chili con carne", dispo:false});
		Plat.insert({name:"Tajine de poulet", dispo:false});
		Plat.insert({name:"Poulet teriyaki", dispo:false});
		Plat.insert({name:"Raviolis ricotta épinard", dispo:false});
		Plat.insert({name:"Poulet sauce citron purée de patates douces", dispo:false});
	}

	if (!Pizza.findOne()) {
		Pizza.insert({name:"Kebab", dispo:false});
		Pizza.insert({name:"Royale", dispo:false});
		Pizza.insert({name:"Saumon", dispo:false});
		Pizza.insert({name:"Tomate mozzarella", dispo:false});
		Pizza.insert({name:"Boeuf chorizo", dispo:false});
		Pizza.insert({name:"4 Fromages", dispo:false});
		Pizza.insert({name:"Tartiflette", dispo:false});
		Pizza.insert({name:"Jambon speck", dispo:false});
		Pizza.insert({name:"Campagnarde", dispo:false});
		Pizza.insert({name:"Poulet moutarde", dispo:false});
		Pizza.insert({name:"Chorizo", dispo:false});
		Pizza.insert({name:"Chévre", dispo:false});
		Pizza.insert({name:"Chévre miel", dispo:false});
	}

	Meteor.publish("compteur", function() {
		return Compteur.find({});
	});
    Meteor.publish("userData", function () {
        return Meteor.users.find({_id: this.userId});
    });
  	Meteor.publish("plat", function() {
		return Plat.find({});
	});
	Meteor.publish("pizza", function() {
		return Pizza.find({});
	});

    Meteor.call("config");
}
 
if (Meteor.isClient) {
	Push.enabled(true);
	Meteor.subscribe("compteur");
    Meteor.subscribe("userData");
	Meteor.subscribe("plat");
    Meteor.subscribe("pizza");
	
	Template.registerHelper('counter', function () {
			return Compteur.findOne().compt;
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
		counterInbetween: function(valueinf, valuesup) { //regarde si le nb de clics > value
			return (Compteur.findOne().compt >= valueinf) && (Compteur.findOne().compt < valuesup);
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
        affichePlat : function(){
        	return Plat.find({dispo: true});
        },
        affichePizza : function(){
        	return Pizza.find({dispo: true});
        },
		isButtonActivated : function() {return isButtonEnabled();}
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
	
	Template.Adminbar.helpers({
		isConnected :function(){
            return Meteor.userId();
        },
		listPizza: function(event){
			return Pizza.find({});
		},
		listPlat: function(event){
			return Plat.find({});
		}
	});

	Template.Adminbar.events({
		"submit .adminform":function(event){
			event.preventDefault();
			Meteor.call("serverNotification", event.target.textarea.value, "Centrale YO");	
		},
		"click .pizza-check":function(event){
			event.preventDefault();
			Meteor.call("checkPizza", this._id, ! this.checked);
		},
		"click .plat-check":function(event){
			event.preventDefault();
			Meteor.call("checkPlat", this._id, ! this.checked);
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
}