var mongoose = require('mongoose');


var AtelierSchema = mongoose.Schema({
	nom:String,
	theme:[],
	type:String,
	date:[],
	lieu:String,
	capacite:Number,
	publicCible:[],
	contenu:String,
	description:String,
	partenaire:[],
	laboratoire:String

});

mongoose.model('Atelier', AtelierSchema);