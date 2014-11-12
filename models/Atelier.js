var mongoose = require('mongoose');


var AtelierSchema = mongoose.Schema({
	nom:String,
	theme:[],
	type:String,
	date:[],
	lieu:String,
	placesRestantes:Number,
	publicCible:[],
	description:String,
	partenaire:[],
	laboratoire:String

});

mongoose.model('Atelier', AtelierSchema);