var express = require('express'),
	app         = module.exports = express(),
	server      = require('http').createServer(app),
	ent         = require('ent'),
	swig 		= require('swig'),
	mongoose    = require('mongoose');
	mongoose.connect('mongodb://localhost/it340');

app.use(express.cookieParser('connect'));
app.use(express.bodyParser());
// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// Don't leave both of these to `false` in production!

require('./models/Atelier');
var ateliers = require('./controllers/Ateliers');

/**
 * Routes
 */

app.get('/ateliers', ateliers.index);

app.get('/atelier/new', ateliers.new);

app.post('/atelier', ateliers.create);

app.get('/atelier/:id', ateliers.show);

app.delete('/atelier/:id', ateliers.delete);

app.get('/atelier/:id/edit', ateliers.edit);

app.post('/atelier/:id', ateliers.update);



//Fonction debug
app.get('/get',function(req,res){
	/**DebugFonction qui permet de lister la totalité de la base**/
	mongoose.model('Atelier').find().exec(function(err, listeAtel){
		if(err) console.error(err);
		else{
			console.log(listeAtel);
			res.end('Console');
		}
	})
});


console.log("Server running listening on port 8080 ...");

server.listen(8080);

