	var express = require('express'),
	app = module.exports = express(),
	http = require('http'),
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

	});
	var Atelier = mongoose.model('Atelier', listeAtelier);



	var server = http.createServer(function (request, response) {
		response.writeHead(200);
		response.end("<h1>Hello World From NodeJS</h1>\n");
	});


	server.listen(8080);
