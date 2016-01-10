#Centrale Yo

##Installation de Meteor

Tout d'abord installer meteor en suivant ce lien : https://www.meteor.com/install

##Lancement de Meteor

Ensuite ouvrez un terminal (cmd.exe sous Windows, Finder>Services>New Terminal sous Mac) et se placer sur le dossier de Centrale Yo (cd "...")

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

###Configuration du projet
Il faut d'abord créer le compteur dans la base de donnée, pour se faire lancer une fênetre de commandes sur le dossier, entrer la commande "meteor mongo" puis "db.compteur.insert({compt:0})"

La base de donnée est alors configuré

