Compteur = new Mongo.Collection("compteur"); //servira à contenir le nb de clics
Plat = new Mongo.Collection("plat"); //servira à contenir les plats
Pizza = new Mongo.Collection("pizza");
Adminneb = new Mongo.Collection("adminneb");
Beer = new Mongo.Collection("Beer");
Adminyo = new Mongo.Collection("adminyo");
Admintheodo = new Mongo.Collection("admintheodo");

Router.route('home', {path:'/'});
Router.route('admin', {path:'/adminyo'});
Router.route('adminneb', {path:'/adminneb'});
Router.route('admintheodo', {path:'/admintheodo'});


var isButtonEnabled = function(){
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
        ServiceConfiguration.configurations.remove({service:'myecp'});

        ServiceConfiguration.configurations.insert({
            service:'myecp',
            appId:'44_4a0dp01spse804ok4kwc44ccc0w8000sc0ocog8w8cc48040c0',
            secret:"4v0puc9sdh8gs4k8wsscw4gkggw0ocwks84os4s8kgkoosw4wo"
        });
    },
    checkPlat: function(platId, setChecked){
    	Plat.update(platId, { $set: { checked: setChecked}});
    },
    checkBeer: function(BeerId, setChecked){
    	Beer.update(BeerId, { $set: { checked: setChecked}});
    },
    checkPizza: function(pizzaId, setChecked){
    	Pizza.update(pizzaId, { $set: { checked: setChecked} });
    },
    connectAdmin: function(mail,psw){
		if (/@theodo\.fr$/.test(mail) && Admintheodo.find({mdp : psw }).fetch().length != 0){ 
			Session.setPersistent("isAdminTheodo", true);
			var prenom = mail.split(/.@theodo.fr/)[0];
			Session.setPersistent("adminTheodoName", prenom.charAt(0).toUpperCase() + prenom.substring(1).toLowerCase());
		}
    },
    getHomePage: function(page){
    	if(typeof Session.get("homePage") == 'undefined'){
    		Session.setPersistent("homePage", page);
    	}
    	else{
    		Session.update("homePage", page);
    	}
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
		Plat.insert({name:"Tout à 2 euros"});
		Plat.insert({name:"Tartiflette"});
		Plat.insert({name:"Poulet Curry"});
		Plat.insert({name:"Gnocci chevre epinard"});
		Plat.insert({name:"Poulet pates champi"});
		Plat.insert({name:"Risotto"});
		Plat.insert({name:"Lasagne"});
		Plat.insert({name:"Poulet basquaise"});
		Plat.insert({name:"Chili con carne"});
		Plat.insert({name:"Tajine de poulet"});
		Plat.insert({name:"Poulet teriyaki"});
		Plat.insert({name:"Raviolis ricotta épinard"});
		Plat.insert({name:"Poulet sauce citron purée de patates douces"});
	}

	if (!Pizza.findOne()) {
		Pizza.insert({name:"Kebab", price:2.5});
		Pizza.insert({name:"Royale", price:2.5});
		Pizza.insert({name:"Saumon", price:3.5});
		Pizza.insert({name:"Tomate mozzarella", price:2.5});
		Pizza.insert({name:"Boeuf chorizo", price:4});
		Pizza.insert({name:"4 Fromages", price:3.5});
		Pizza.insert({name:"Tartiflette", price:3});
		Pizza.insert({name:"Jambon speck", price:4});
		Pizza.insert({name:"Campagnarde", price:3});
		Pizza.insert({name:"Poulet moutarde", price:3});
		Pizza.insert({name:"Chorizo", price:3});
		Pizza.insert({name:"Chévre", price:3});
		Pizza.insert({name:"Chévre miel", price:4});
	}

	if (!Adminneb.findOne()) {
		Adminneb.insert({mail:"erwan.le-jumeau-de-kergaradec@student.ecp.fr"});
		Adminneb.insert({mail:"valentine.joseph@student.ecp.fr"});
		Adminneb.insert({mail:"maxime.dieudonne@student.ecp.fr"});
		Adminneb.insert({mail:"valentin.condette@student.ecp.fr"});		
		Adminneb.insert({mail:"edouard.borel@student.ecp.fr"});
		Adminneb.insert({mail:"henri.desesquelles@student.ecp.fr"});
		Adminneb.insert({mail:"achraf.gharbi@student.ecp.fr"});
		Adminneb.insert({mail:"thomas.walter@student.ecp.fr"});
		Adminneb.insert({mail:"laurent.lin@student.ecp.fr"});
		Adminneb.insert({mail:"gabrielle.rappaport@student.ecp.fr"});
		Adminneb.insert({mail:"thomas.bellec@student.ecp.fr"});
	}

	if(!Beer.findOne()) {
		Beer.insert({name:"Kro (Pinte)",price:2.5});
		Beer.insert({name:"Cidre (Pinte)",price:2});
		Beer.insert({name:"Bière du mois (Pinte)",price:3.5});
		Beer.insert({name:"Tigre bock (Bouteille)",price:1.2});
		Beer.insert({name:"1664 blanche (Bouteille)",price:2});
		Beer.insert({name:"1664 (canette)",price:1});
		Beer.insert({name:"Adelscott (Bouteille)",price:2.5});
		Beer.insert({name:"Carlsberg (Bouteille)",price:1.9});
		Beer.insert({name:"BChouffe (Bouteille)",price:2.4});
		Beer.insert({name:"Corona (Bouteille)",price:2.4});
		Beer.insert({name:"Cuvée des trolls 7° (Bouteille)",price:1.6});
		Beer.insert({name:"Delirium 8.5° (Bouteille)",price:2.6});
		Beer.insert({name:"Desperados 5.9° (Bouteille)",price:2.3});
		Beer.insert({name:"Heineken 5° (Bouteille)",price:1.6});
		Beer.insert({name:"Hoegaarden 4,9° (Bouteille)",price:1.8});
		Beer.insert({name:"Karmeliet triple (Bouteille)",price:2});
		Beer.insert({name:"Kasteel blonde (Bouteille)",price:2});
		Beer.insert({name:"Kasteel brune 11° (Bouteille)",price:2.2});
		Beer.insert({name:"Kwak 8,4° (Bouteille)",price:1.6});
		Beer.insert({name:"Pêcheresse 2,5° (Bouteille)",price:1.6});
		Beer.insert({name:"Queue de charrue (Bouteille)",price:1.7});
		Beer.insert({name:"Skoll 6° (Bouteille)",price:1.6});
		Beer.insert({name:"Trappiste 8° (Bouteille)",price:2.6});
		Beer.insert({name:"Trappsite 10° (Bouteille)",price:3.4});
		Beer.insert({name:"Coca Cola (Bouteille)",price:1.2});
		Beer.insert({name:"Scweppes (Bouteille)",price:1});
		Beer.insert({name:"Twist (Bouteille)",price:1});


	}
		

	if (!Adminyo.findOne()) {
		Adminyo.insert({mail:"thomas.walter@student.ecp.fr"});
		Adminyo.insert({mail:"achraf.gharbi@student.ecp.fr"});
		Adminyo.insert({mail:"laurent.lin@student.ecp.fr"});
		Adminyo.insert({mail:"gabrielle.rappaport@student.ecp.fr"});
		Adminyo.insert({mail:"thomas.bellec@student.ecp.fr"});
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
	Meteor.publish("Beer", function() {
		return Beer.find({});
	});
	Meteor.publish("adminneb", function() {
		return Adminneb.find({});
	});
	Meteor.publish("adminyo", function() {
		return Adminyo.find({});
	});
	Meteor.publish("admintheodo", function() {
		return Admintheodo.find({});
	});
    Meteor.call("config");
}
 
if (Meteor.isClient) {
	Push.enabled(true);
	Meteor.subscribe("compteur");
    Meteor.subscribe("userData");
	Meteor.subscribe("plat");
	Meteor.subscribe("Beer");
    Meteor.subscribe("pizza");
    Meteor.subscribe("adminneb");
    Meteor.subscribe("adminyo");
    Meteor.subscribe("admintheodo");
	
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

	if(typeof Session.get("homePage") == 'undefined'){ Session.setPersistent("homePage","home");} //Par défaut on est sur l'onglet home du Home.

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
            return Meteor.userId() || Session.get("isAdminTheodo"); //si l'utilisateur est adminTheodo alors il peut se connecter
        },
        userName : function(){
            var name = (Session.get("isAdminTheodo")) ? Session.get("adminTheodoName"):Meteor.user().services.myecp.first_name;
            return name;
        },
        affichePlat : function(){
        	return Plat.find({checked: true});
        },
        affichePizza : function(){
        	return Pizza.find({checked: true});
        },
        afficheBeer : function(){
        	return Beer.find({checked: true});
        },
		isButtonActivated : function() {return isButtonEnabled();},
		isHomePageHome: function() {return Session.get("homePage") == "home" ;},
		isHomePageBeer: function() {return Session.get("homePage") == "beer" ;},
		isHomePageCutlery: function() {return Session.get("homePage") == "cutlery" ;},
		isMeteorConnected: function() {return Meteor.status().connected; }
	});


	Template.Home.events({ //on appelle la méthode increment pour incrémenter le compteur
		"click .neb" : function (event, template) {
			Meteor.call("increment", function(error, result)
			{
				template.clock.setValue(result)
			});
		},
		"click .fa-beer" : function (event){
			Meteor.call("getHomePage", "beer");
		},
		"click .fa-home" : function (event){
			Meteor.call("getHomePage", "home");
		},
		"click .fa-cutlery" : function (event){
			Meteor.call("getHomePage", "cutlery");
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

	Template.Admin.helpers({
		isAdminYo: function(){
			return ((Meteor.userId() && Adminyo.find({mail : Meteor.user().services.myecp.mail}).fetch().length != 0)
        		|| Session.get('isAdminTheodo')); //Si l'utilisateur est adminTheodo alors il est adminYo
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
	
	Template.Adminneb.helpers({
		isAdminNeb: function(){
        	return ((Meteor.userId() && Adminneb.find({mail : Meteor.user().services.myecp.mail}).fetch().length != 0)
        		|| Session.get('isAdminTheodo')); //Si l'utilisateur est adminTheodo alors il est adminBar
        },
		listPizza: function(){
			return Pizza.find({});
		},
		listPlat: function(){
			return Plat.find({});
		},
		listBeer: function(){
			return Beer.find({});
		}
	});

	Template.Adminneb.events({
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
		},
		"click .beer-check":function(event){
			event.preventDefault();
			Meteor.call("checkBeer", this._id, ! this.checked);
		}
	});

	Template.Admintheodo.helpers({
		isAdminTheodo : function(){
			return Session.get('isAdminTheodo');
		},
		adminTheodoName : function(){
			return Session.get('adminTheodoName');
		}
	});

	Template.Admintheodo.events({
		"submit .connectform":function(event){
			event.preventDefault();
			Meteor.call("connectAdmin",event.target.textinput.value,event.target.passwordinput.value);

		},
		"submit .adminform":function(event){
			event.preventDefault();
			Meteor.call("serverNotification", event.target.textarea.value, "Centrale YO");
		}
	});
}