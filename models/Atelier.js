var mongoose = require('mongoose');


var AtelierSchema = mongoose.Schema({
	nom:String,
	theme:[],
	type:String,
	date:[],
	lieu:String,
	placesrestantes:Number,
	publiccible:[],
	contenu:String,
	description:String,
	partenaire:[],
	laboratoire:String

});

mongoose.model('Atelier', AtelierSchema);