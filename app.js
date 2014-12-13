var express = require('express'),
app         = module.exports = express(),
server      = require('http').createServer(app),
ent         = require('ent'),
swig 		= require('swig'),
mongoose    = require('mongoose');
if (!module.parent) {
	mongoose.connect('mongodb://localhost/it340');
} else {
	mongoose.connect('mongodb://localhost/it340_test');
}


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

app.get('/admin',function(req,res){

	if(req.cookies.login ==''){
		//Non connecté - on le connecte
	var minute = 60 * 120 * 1000;//duree de vie du cookie
	res.cookie('login', "admin", { maxAge: minute});
	res.redirect('/ateliers');
}else {
		//Connecté -- on le déconnecte
	var minute = 60 * 120 * 1000;//duree de vie du cookie
	res.cookie('login', "", { maxAge: minute});
	res.redirect('/ateliers');
}


});


var env = process.argv[2] || process.env.NODE_ENV || 'dev';
switch (env) {
	case 'dev':
	server.listen(8080);
	console.log("Server running listening on port 8080 ...");
	break;
	case 'prod':
	console.log("Server running listening on port 80 ...");
	server.listen(80);
	break;
	case 'test':
	console.log("Server running in test mode");
	break;
}


