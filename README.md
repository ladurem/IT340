#ReadMe
* http://mladure.rmorpheus.enseirb.fr
* http://github.com/ladurem/IT340

## Décomposition des dossiers :

	- controllers
		Application générale
	- models
		Modèle de la base de donnée et initialisation
	- node_modules
		[GEN] modules telechargés, listés dans package.json
	- public
		fichiers statiques - CSS / JS
	- test
		Dossier de gestion des tests (unitaitres / EDE)
	- views
		Vues utilisés par le site


## Lancement :

### Pré-requis : 
- Avoir mongoDB installé et en fonctionnement sur le port 27017
- Dans le dossier du projet, executez  : `npm install`
Le systeme va télécharger les dépendances du projet dans le dossier node_modules/
	- Pour le bon foncitonnement des tests, l'installation de mocha doit se faire avec l'option -g :`npm install -g mocha`

### Démarrage du service :
- Lancement en "dev" sur le port 8080 : `node app.js`
- Lancement en "prod" sur le port 80 	: `node app.js prod`

### Fonctionnalités :
* / ou /ateliers 
	* Listing de tous les ateliers et localisation sur une map
	* Lien dans le menu qui permet de s'identifer en tant qu'administrateur pour permettre l'edition/suppression atelier
* /atelier/new
	* Création d'un nouvel atelier
* /atelier/id/edit
	* Modification de l'atelier passé en parametre (si admin)
* /atelier/id [DELETE]
	* Suppresion d'un atelier (si admin)
