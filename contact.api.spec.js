const app = require('./server.js');
const request = require('supertest');

const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('/contacts', function () {
  beforeEach(function () {
    Contact.contacts = [
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 1
                          },
                          {
                            name: 'sam',
                            email: 'sam@sam.com',
                            id: 2
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 3
                          },
                          {
                            name: 'bob',
                            email: 'bob@bob.com',
                            id: 4
                          },
                          {
                            name: 'bill',
                            email: 'bill@bill.com',
                            id: 5
                          }
                        ];
    Contact.contactsID = 6;
  });

  describe('GET /contacts/:id', function () {
    it ('GETs a contact if it exists', function (done) {
      request(app)
        .get('/contacts/3')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            expect(res.body.name).to.equal('bill');
            expect(res.body.email).to.equal('bill@bill.com');
            expect(res.body.id).to.equal(3);
            done();
          }
        });
    });

    it('returns 404 if id not found', function (done) {
      request(app)
        .get('/contacts/999')
        .expect(404)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            done();
          }
        });
    });
  });

  describe('POST /contacts', function () {
    it ('creates a new contact', function (done) {
      request(app)
        .post('/contacts')
        .send({ name: 'sue', email: 'sue@sue.com' })
        .expect(201)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            expect(res.body.name).to.equal('sue');
            expect(res.body.email).to.equal('sue@sue.com');
            expect(res.body.id).to.exist;

            console.log(Contact.contacts);

            Contact.findById(res.body.id, function (err, foundContact) {
              expect(foundContact.name).to.equal('sue');
              expect(foundContact.email).to.equal('sue@sue.com');
              expect(foundContact.id).to.equal(res.body.id);
              expect(Contact.contacts.length).to.equal(6);
              done();
            });
          }
        });
    });


    it('modifies a contact', function (done) {
      request(app)
        .put('/contacts/3')
        .send({ email: 'newEmail@newEmail.com', name: 'newName' })
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            // check the response body
            expect(res.body.name).to.equal('newName');
            expect(res.body.email).to.equal('newEmail@newEmail.com');
            expect(res.body.id).to.equal(3);
            
            // now make sure it got changed on the server
            Contact.findById(3, function (err, foundContact) {
              expect(foundContact.name).to.equal('newName');
              expect(foundContact.email).to.equal('newEmail@newEmail.com');
              expect(foundContact.id).to.equal(3);
              done();
            });
          }
        });
    });


  });

  describe('PUT /contacts/:id', function () {
    xit ('returns 404 if the provided id does not exist', function (done) {
      done();
    });

    xit('modifies a contact', function (done) {
      done();
    });
  });

  describe.only('DELETE /contacts/:id', function () {
    it ('returns 404 if the provided id does not exist', function (done) {
      request(app)
        .delete('/contacts/999')
        .expect(404)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            done();
          }            
        });
    });
    
    it ('deletes a contact', function (done) {
      request(app)
        .delete('/contacts/3')
        .expect(200)
        .end(function(err, res){
          if(err) {
            console.log('you have fucked up');
            console.log(err);
            done(err);
          } else {
            // check the response body
            expect(Contact.contacts.length).to.equal(4);
            var ids = Contact.contacts.map((contact) => contact.id);
            expect(ids).to.not.contain(3);
            done();
          }            
        });
    });
  });

  describe('GET /contacts', function () {
    xit ('gets all the contacts', function (done) {
      done();
    });
  });

  describe('GET /search', function (done) {
    xit ('searches by email', function (done) {

    });

    xit ('searches by name', function (done) {

    });

    xit ('searches by both name and email', function (done) {

    });
  });
});


