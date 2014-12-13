process.env.NODE_ENV = 'test';
require('../models/Atelier');

var should   = require('should'),
    request  = require('supertest'),  
    mongoose = require('mongoose'),
    app      = require('../app'),
    agent    = request.agent(app),
    Atelier  = mongoose.model('Atelier');

var count;

describe('API tests', function() {
  var url = 'http://localhost:8080';
  before(function(done) {
    this.server = require('http').createServer(app).listen(8080);
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

  describe('GET /ateliers', function () {
    it('should respond with a json list of 1 ateliers', function (done) {
      agent
        .get('/ateliers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          res.body.should.be.an.Array.and.have.length(1);
          res.body[0].nom.should.equal("Atelier1");                    
          res.body[0].type.should.equal("Atelier Scientifique");                    
          res.body[0].lieu.should.equal("lieu_");                    
          res.body[0].capacite.should.equal(9);                    
          res.body[0].theme.should.be.an.Array.and.have.length(3);                    
          res.body[0].date.should.be.an.Array.and.have.length(0);                    
          done();
        });
    });
  });



  describe('POST /atelier', function () {
    before(function (done) {
      Atelier.count(function (err, cnt) {
        count = cnt
        done()
      });
    });

    it('should say the atelier is created', function (done) {
      agent
        .post('/atelier')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .field('nom', 'Atelier2')
        .field('type', 'Atelier Scientifique')
        .field('theme', 'Chimie')
        .field('theme', 'Math')
        .field('lieu', 'lieu_2')
        .field('capacite', '10')
        .field('publicCible', 'Collège')
        .field('description', 'description2')
        .field('partenaire', 'Partenaire3')
        .field('partenaire', 'Partenaire4')
        .field('laboratoire', 'CNRS')
        .expect('Content-Type', /json/)
        .expect(201)
        .end(done);
    });

    it('should insert a record to the database', function (done) {
      Atelier.count(function (err, cnt) {
        cnt.should.equal(count + 1)
        done()
      });
    });

    it('should save the atelier to the database', function (done) {
      Atelier
      .findOne({ nom: 'Atelier2'})
      .exec(function (err, atelier) {
        should.not.exist(err)
        atelier.nom.should.equal("Atelier2");                    
        atelier.type.should.equal("Atelier Scientifique");                    
        atelier.lieu.should.equal("lieu_2");                    
        atelier.capacite.should.equal(10);                    
        atelier.theme.should.be.an.Array.and.have.length(2);                    
        atelier.date.should.be.an.Array.and.have.length(0);                    
        done();
      });
    });
  });



  describe('POST /atelier/:id', function () {
    var atelierToEdit;
    before(function (done) {
      Atelier.count(function (err, cnt) {
        count = cnt
      });
      Atelier
        .findOne({ nom: 'Atelier2'})
        .exec(function (err, atelier) {
          should.not.exist(err)
          atelierToEdit = atelier;               
          done();
        });
    });

    it('should say the atelier is updated', function (done) {
      agent
        .post('/atelier/'+atelierToEdit._id)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .field('nom', 'Atelier2To3')
        .field('type', 'Experience Scientifique')
        .field('theme', 'Math')
        .field('lieu', 'lieu_3')
        .field('capacite', '5')
        .field('publicCible', 'Collège')
        .field('description', 'description2')
        .field('partenaire', 'Partenaire3')
        .field('partenaire', 'Partenaire4')
        .field('laboratoire', 'CNRS')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('should not insert a record to the database', function (done) {
      Atelier.count(function (err, cnt) {
        cnt.should.equal(count)
        done()
      });
    });

    it('should update the atelier to the database', function (done) {
      Atelier
      .findOne({ nom: 'Atelier2To3'})
      .exec(function (err, atelier) {
        should.not.exist(err)
        atelier.nom.should.equal("Atelier2To3");                    
        atelier.type.should.equal("Experience Scientifique");                    
        atelier.lieu.should.equal("lieu_3");                    
        atelier.capacite.should.equal(5);                    
        atelier.theme.should.be.an.Array.and.have.length(1);                    
        atelier.date.should.be.an.Array.and.have.length(0);                    
        done();
      });
    });
  });


  describe('GET /atelier/:id', function () {
    var atelierToShow;
    before(function (done) {
      Atelier
        .findOne({ nom: 'Atelier2To3'})
        .exec(function (err, atelier) {
          should.not.exist(err)
          atelierToShow = atelier;               
          done();
        });
    });
    it('should respond with an atelier in json', function (done) {
      agent
        .get('/atelier/'+atelierToShow._id)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          res.body.should.be.an.Array.and.have.length(1); 
          res.body[0].nom.should.equal("Atelier2To3");                    
          res.body[0].type.should.equal("Experience Scientifique");                    
          res.body[0].lieu.should.equal("lieu_3");                    
          res.body[0].capacite.should.equal(5);                    
          res.body[0].theme.should.be.an.Array.and.have.length(1);                    
          res.body[0].date.should.be.an.Array.and.have.length(0);                     
          done();
        });
    })
  });



  describe('DELETE /atelier/:id', function () {
    var atelierToDelete;
    before(function (done) {
      Atelier.count(function (err, cnt) {
        count = cnt
      });
      Atelier
        .findOne({ nom: 'Atelier1'})
        .exec(function (err, atelier) {
          should.not.exist(err)
          atelierToDelete = atelier;               
          done();
        });
    });

    it('should respond with a json list of 2 ateliers', function (done) {
      agent
        .get('/ateliers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          res.body.should.be.an.Array.and.have.length(2);
          done();
      });
    });

    it('should say the atelier is deleted', function (done) {
      agent
        .del('/atelier/'+atelierToDelete._id)
        .set('Accept', 'application/json')
        .set('Cookie','login=')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('should have remove a record from the database', function (done) {
      Atelier.count(function (err, cnt) {
        cnt.should.equal(count-1)
        done()
      });
    });

    it('should respond with a json list of 1 ateliers', function (done) {
      agent
        .get('/ateliers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err,res) {
          if (err) {
            throw err;
          }
          res.body.should.be.an.Array.and.have.length(1);
          res.body[0].nom.should.equal("Atelier2To3");                    
          res.body[0].type.should.equal("Experience Scientifique");                    
          res.body[0].lieu.should.equal("lieu_3");                    
          res.body[0].capacite.should.equal(5);                    
          res.body[0].theme.should.be.an.Array.and.have.length(1);                    
          res.body[0].date.should.be.an.Array.and.have.length(0);                    
          done();
        });
    })

  });

  
  after(function (done) {
    var server = this.server
    mongoose.connection.db.executeDbCommand({ dropDatabase:1 }, function (err, result) {
      mongoose.connection.close();
      server.close(done);
    });
    
  });

});