	var express = require('express'),
		app = module.exports = express(),
		server = require('http').createServer(app),
		ent = require('ent'),
		mongoose = require('mongoose');
	
	mongoose.connect('mongodb://localhost/it340');

	var listeAtelier = mongoose.Schema({
		id: Number,
		nom:String,
		theme:String,
		duree:Number,
		placerestante:Number,
		publiccible:String,
		contenu:String,
		description:String,
		partenaire:String,
		laboratoire:String

	});
	var Atelier = mongoose.model('Atelier', listeAtelier);

	//Détail des ateliers
	app.get('/atelier/:id', function (req, res) {
		res.end('Détail ateliers');

		//res.render('atelier.ejs', {id: req.params.id});
	});

	//Liste des ateliers
	app.get('/ateliers', function (req, res) {
		res.end("Liste des ateliers");
		//res.render('ateliers.ejs');
	});

	// Supression d'un atelier
	app.delete('/atelier/:id', function (req, res){
	  	Atelier.findByIdAndRemove(req.params.id, function (err, atelier) {
			if (err) {
				console.log("Erreur suppression");
				res.send(500, { error: err })
			} else if (atelier) {
				console.log("Atelier supprimé");
				res.send(200)
			} else {
				console.log("Atelier non trouvé")
				res.send(404)
			}
		});
	});

	console.log("Server running listening on port 8080 ...");

	server.listen(8080);


