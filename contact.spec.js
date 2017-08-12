const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('A Contact', function () {
  it('creates a contact', function (done) {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
      expect(createdContact.id).to.exist;
      done();
    });
  });
 });

  describe.only('find', function () {
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
    
    it.only ('finds by name', function (done) {
      Contact.find({ name: 'bob' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(1);
        expect(ids).to.contain(4);

        Contact.find({ name: 'sam' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(2);
          done();
        });
      });
    });

	it.only ('finds by email', function (done) {
      Contact.find({ email: 'bob@bob.com' }, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(2);
        var ids = foundContacts.map((contact) => contact.id);
        expect(ids).to.contain(1);
        expect(ids).to.contain(4);

        Contact.find({ email: 'sam@sam.com' }, function (err, otherFoundContacts) {
          expect(otherFoundContacts.length).to.equal(1);
          expect(otherFoundContacts[0].id).to.equal(2);
          done();
        });
      });
    });

    it('returns all contacts if search object is empty', function (done) {
      Contact.find({}, function (err, foundContacts) {
        expect(foundContacts.length).to.equal(5);
        done();
      });
    });

  });
