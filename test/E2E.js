process.env.NODE_ENV = 'test';
var app = require('../app');
var assert = require('assert');
var Browser = require('zombie');
var mongoose    = require('mongoose');

describe('E2E tests', function() {
  this.timeout(10000);
  before(function() {
    this.server = require('http').createServer(app).listen(8080);
    this.browser = new Browser({ site: 'http://localhost:8080', debug: true, features: "scripts css img iframe"});
  });



  describe('Ateliers new', function(done) {
    
    before(function(done) {
      this.browser.visit('/atelier/new', done);
    });
    
    it('should add an atelier', function(done) {
      var browser = this.browser;
      assert.ok(browser.success);
      browser.fill('nom', 'AtelierE2ETest').
        fill('theme[]', 'Math').
        fill('theme[]', 'Physique').
        fill('date[0][0]', '12/12/2014').
        fill('date[0][1]', '12:14').
        fill('date[0][2]', '12:44').
        fill('laboratoire', 'Labri').
        fill('lieu', '').
        fill('capacite', '12').
        fill('publicCible[]', 'Collège').
        fill('publicCible[]', 'Lycée').
        fill('partenaires[]', 'Thales').
        fill('description', 'Blabla').
        pressButton('Envoyer', function(error) {
          browser.assert.success();
          browser.assert.text('h1', 'Liste des Ateliers');
          browser.assert.text('.item-atelier h3 a', 'AtelierE2ETest');
        });
        done();
    });

  });


  describe('ateliers index', function(done) {
    
    before(function(done) {
      this.browser.visit('/ateliers', done);
    });
    
    it('should show edit button after login', function(done) {
      var browser = this.browser;
      assert.ok(browser.success);
      browser.clickLink('a#connect').then(function() {
        browser.assert.success();
        browser.assert.element('span.edit_atelier');
      }).then(done, done);
    });

  });


  describe('atelier show', function(done) {
    
    before(function(done) {
      this.browser.visit('/ateliers', done);
    });
    
    it('should show the atelier description', function(done) {
      var browser = this.browser;
      assert.ok(browser.success);

      browser.clickLink('AtelierE2ETest').then(function() {
        browser.assert.success();
        browser.assert.element('.page-header-bis');
        browser.assert.element('.panel-title');
        browser.assert.text('.panel-body', 'Blabla');
      }).then(done, done);
    });
  });


  describe('Ateliers edit', function(done) {
    
    before(function(done) {
      var browser = this.browser;
      browser.visit('/ateliers', function() {
        // Check we're connected as admin
        browser.assert.success();
        browser.assert.element('span.edit_atelier');
        done();
      });
    });
    
    it('should change the atelier name', function(done) {
      var browser = this.browser;
      
      // Click edit button
      browser.click('span.edit_atelier').then(function() {
        browser.assert.success();
        browser.assert.text('legend', 'Edition - AtelierE2ETest');
        browser.fill('nom', 'AtelierE2ETestEdited').
          pressButton('Envoyer', function(error) {
            browser.assert.success();
            browser.assert.text('h1', 'Liste des Ateliers');
            browser.assert.text('.item-atelier h3 a', 'AtelierE2ETestEdited');
          });
        // done();
      }).then(done, done);
    });
  });



  after(function(done) {
    mongoose.connection.db.executeDbCommand({ dropDatabase:1 }, function (err, result) {
      mongoose.connection.close(done);
    });
    this.server.close(done);
  });

});