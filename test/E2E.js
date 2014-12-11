require('../models/Atelier');

var should   = require('should'),
    Browser = require("zombie"),  
    app      = require('../app'),
    mongoose    = require('mongoose');
    Atelier  = mongoose.model('Atelier');

var count;

describe('Ateliers tests', function() {
  var url = 'http://localhost:8080';
  before(function(done) {
    var atelier = new Atelier({
      nom:             "Atelier1",
      type:            "Atelier Scientifique",
      theme:           [ 'Chimie', 'Physique', 'Math' ],
      date:            [],
      lieu:            "lieu_",
      capacite: 9,
      publicCible:     [ 'Lycée' ],
      description:     "description_",
      partenaire:      [ 'Partenaire1', 'Partenaire2' ],
      laboratoire:     "Labri"
    });
    atelier.save(done)						
  });


  
  after(function (done) {
    mongoose.connection.db.executeDbCommand({ dropDatabase:1 }, function (err, result) {
      mongoose.connection.close(done);
    });
  });

});