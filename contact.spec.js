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

describe('find', function () {
  	it.only ('finds by name', function (done) {
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

     Contact.find({ name: 'bob' }, function (err, foundContacts) {
       expect(foundContacts.length).to.equal(2);
       var ids = foundContacts.map((contact) => contact.id);
       expect(ids).to.contain(1);
       expect(ids).to.contain(4);

       Contact.find({ name: 'sam' }, function (err, otherFoundContacts) {
         expect(otherFoundContacts.length).to.equal(1);
         expect(otherFoundContacts[0].id).to.equal(2);
         done();

		  this.find = function (attrs, callback) {
		    var nameToMatch = attrs.name;
		    var emailToMatch = attrs.email;
		    var results = [];

		    for (var i=0;i<self.contacts.length;i++) {
		      var matchesName = true;
		      var matchesEmail = true;

		      // IF a name was provided and it doesn't match...
		      if (nameToMatch && (self.contacts[i].name != nameToMatch)) {
		        matchesName = false;
		      }

		      // IF an email was provided and it doesn't match
		      if (emailToMatch && (self.contacts[i].email != emailToMatch)) {
		        matchesEmail = false;
		      }

		      // IF it passed both tests, include it in the results
		      if (matchesName && matchesEmail) {
		        results.push(self.contacts[i]);
		      }
		    }
		    callback(null, results);
		  };
         
       });
     });
   });
});