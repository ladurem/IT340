	var express = require('express'),
	app         = module.exports = express(),
	server      = require('http').createServer(app),
	ent         = require('ent'),
	ejs         = require('ejs'),
	mongoose    = require('mongoose');
	mongoose.connect('mongodb://localhost/it340');
	
	app.use(express.cookieParser('connect'));
	app.use(express.bodyParser());

	var listeAtelier = mongoose.Schema({
		nom:String,
		theme:String,
		type:String,
		duree:Number,
		placesrestantes:Number,
		publiccible:String,
		contenu:String,
		description:String,
		partenaire:String,
		laboratoire:String

	});
	var Atelier = mongoose.model('Atelier', listeAtelier);

	//Détail d'un atelier
	app.get('/atelier/:id', function (req, res) {
		
		Atelier.find({ _id: req.params.id },function (err,atelier) {
			if (err) {
				console.log("Erreur Détails atelier");
				res.send(500, { error: err });
			} else if (atelier) {
				console.log("Détails atelier");
				//res.render('atelier.ejs', {id: req.params.id});
				res.json(atelier);
				res.send(200);
			} else {
				console.log("Atelier non trouvé")
				res.send(404);
			}		
		} 

		)

		
	});

	//Liste des ateliers
	app.get('/ateliers', function (req, res) {
		Atelier.find(function (err,atelier) {
			if (err) {
				console.log("Erreur Liste Ateliers");
				res.send(500, { error: err });
			} else if (atelier) {
				console.log("Liste Ateliers");
				//res.render('atelier.ejs', {id: req.params.id});
				res.json(atelier);
				res.send(200);
			} else {
				console.log("Atelier non trouvé")
				res.send(404);
			}		
		} 

		)
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

	app.post('/atelier', function(req, res){
	//**Ajout des atelier POST **//
	var nom_             = req.body.nom;
	var type_            = req.body.type;
	var duree_           = req.body.duree;
	var placesRestantes_ = req.body.placesRestantes;
	var publicCible_     = req.body.publicCible;
	var contenu_         = req.body.contenu;
	var description_     = req.body.description;
	var partenaires_     = req.body.partenaires;
	var theme_           = req.body.theme;
	var laboratoire_     = req.body.laboratoire;

	var newAtelier = new Atelier({
		nom:nom_,
		type:type_,
		theme:theme_,
		duree:duree_,
		placesrestantes:placesRestantes_,
		publiccible:publicCible_,
		contenu:contenu_,
		description:description_,
		partenaire:partenaires_,
		laboratoire:laboratoire_
	});

	newAtelier.save(function (err, newAtelier) {
		if (err) 
			return res.send(500, { error: err })
		else{
			return	res.send(200);
		}
	});

})



	//Fonction debug
	app.get('/get',function(req,res){
		/**DebugFonction qui permet de lister la totalité de la base**/
		Atelier.find().exec(function(err, listeAtel){
			if(err) console.error(err);
			else{
				console.log(listeAtel);
				res.end('Console');
			}
		})
	});




	console.log("Server running listening on port 8080 ...");

	server.listen(8080);


