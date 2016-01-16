#Centrale Yo

##Utilisation de git

Pour copier les sources en ligne on utilise Git qui sont hébergés sur GitHub


###Windows
Tout d'abrord installer git : https://git-scm.com/download/win
Puis installer TortoiseGit : https://tortoisegit.org/download/

Dans le dossier de votre choix faire un clique droit -> "Git clone"
Entrer le lien donné sur github (https://github.com/Timorem/CentraleYo.git)

Pour rajouter ses modifications 
Clique droit -> Git commit -> Bien Cocher tous les fichiers -> Ecrire un message décrivant les modifications
Clique droit -> TortoiseGit -> Git push (rentrer ses identifiants GitHub lorsque demandé)

Pour mettre son dossier à jour
Clique droit -> Tortoisegit -> Git pul

###Mac/Linux

Tout d'abrord installer git : https://git-scm.com/download/
Lancer un terminal, se placer dans le dossier où l'on souhaite créer le projet et écrire 
```git clone https://github.com/Timorem/CentraleYo.git CentraleYo```

Pour rajouter ses modifications lancer un terminal et se placer sur le dossier CentraleYo
Si il y a des nouveaux fichiers écrire
```git add lenomdufichier```
Puis
```git commit -m MESSAGE DU COMMIT```

Pour mettre son dossier à jour
```git pull```

##Installation de Meteor

Tout d'abord installer meteor en suivant ce lien : https://www.meteor.com/install
Rédemarrer le PC

##Lancement de Meteor

Ensuite ouvrez un terminal (cmd. exe sous Windows, Finder>Services>New Terminal sous Mac) et se placer sur le dossier de Centrale Yo (cd "...")

Entrer la commande "meteor run"

Il s'affiche alors
```
=> Started proxy.
=> Started MongoDB.
=> Started your app.

=> App running at: http://localhost:3000/
   Type Control-C twice to stop.
```

Ouvrez ensuite votre navigateur web et tapez "http://localhost:3000/" dans la barre de navigation

Les modifications des fichiers sont prises en compte dès leur sauvegarde, il suffit alors de recharger la page

##Deployer en ligne

Veiller à avoir un compte Meteor, et être sur le projet centraleyo (Demander à Achraf de vous rajouter)

Lancer un terminal et se placer sur le dossier CentraleYo
Ecrire
```meteor deploy centraleyo.meteor.com```