/**
 * Dependances
 */

var mongoose = require('mongoose')
var Atelier = mongoose.model('Atelier')


/**
 * Liste des ateliers
 */
 exports.index = function (req, res) {
 	Atelier.find(function (err,atelier) {
		if (err) {
			console.log("Erreur Liste Ateliers");
			res.send(500, { error: err });
		} else if (atelier) {
			console.log("Liste Ateliers");
			res.render('liste', {ateliers: atelier});
		} else {
			console.log("Atelier non trouvé")
			res.send(404);
		}		
	});
 };


/**
 * Détail d'un atelier
 */
 exports.show = function (req, res) {
	Atelier.find({ _id: req.params.id },function (err,atelier) {
		if (err) {
			console.log("Erreur Détails atelier");
			res.send(500, { error: err });
		} else if (atelier) {
			console.log("Détails atelier");
			res.render('atelier', {atelier_details: atelier});
		} else {
			console.log("Atelier non trouvé")
			res.send(404);
		}		
	});
 };


/**
 * Supression d'un atelier
 */
 exports.delete = function (req, res) {
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
 };


/**
 * Edition d'un atelier
 */
 exports.edit = function (req, res) {

 };


/**
 * Mise à jour d'un atelier
 */
 exports.update = function (req, res) {
 	var id_              = req.params.id,
		nom_             = req.body.nom,
		type_            = req.body.type,
		date_            = req.body.date,
		lieu_            = req.body.lieu,
		placesRestantes_ = req.body.placesRestantes,
		publicCible_     = req.body.publicCible,
		description_     = req.body.description,
		partenaires_     = req.body.partenaires,
		theme_           = req.body.theme,
		laboratoire_     = req.body.laboratoire;

	Atelier.findById(id_, function (err, editAtelier) {
		if (err) return handleError(err);

		editAtelier.nom             = nom_;
		editAtelier.type            = type_;
		editAtelier.theme           = theme_;
		editAtelier.date          	= date_;
		editAtelier.lieu          	= lieu_;
		editAtelier.placesRestantes = placesRestantes_;
		editAtelier.publicCible     = publicCible_;
		editAtelier.description     = description_;
		editAtelier.partenaire      = partenaires_;
		editAtelier.laboratoire     = laboratoire_;

		editAtelier.save(function (err) {
			if (err) 
				return res.send(500, { error: err })
			else
				return res.send(200);
		});
	});
 };


/**
 * Ajout d'un atelier
 */
 exports.new = function (req, res) {
 	res.render('creationatelier');
 };


/**
 * Creation d'un atelier
 */
 exports.create = function (req, res) {
 	var nom_             = req.body.nom,
		type_            = req.body.type,
		date_   	     = req.body.date,
		placesRestantes_ = req.body.placesRestantes,
		publicCible_     = req.body.publicCible,
		lieu_     		 = req.body.lieu,
		description_     = req.body.description,
		partenaires_     = req.body.partenaires,
		theme_           = req.body.theme,
		laboratoire_     = req.body.laboratoire;

	var newAtelier = new Atelier({
		nom:             nom_,
		type:            type_,
		theme:           theme_,
		date:            date_,
		lieu:            lieu_,
		placesRestantes: placesRestantes_,
		publicCible:     publicCible_,
		description:     description_,
		partenaire:      partenaires_,
		laboratoire:     laboratoire_
	});

	newAtelier.save(function (err, newAtelier) {
		if (err) 
			return res.send(500, { error: err })
		else
			return	res.send(200);
		
	});
 };
