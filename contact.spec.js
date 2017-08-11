const expect = require('chai').expect;
const Contact = require('./contact.js');

describe('A Contact', function () {
  it('creates a contact', function () {
    Contact.create({ name: 'bob', email: 'bob@bob.com' }, function (err, createdContact) {
      expect(createdContact.name).to.equal('bob');
      expect(createdContact.email).to.equal('bob@bob.com');
    });
  });
});