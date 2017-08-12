function ContactsHandler() {
  var self = this;

  this.contacts = [];
  this.contactsID = 1;

  
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

  this.findById = function (attrs, callback) {

  };

  this.create = function (attrs, callback) {
    attrs.id = self.contactsID;
    self.contactsID++;
    this.contacts.push(attrs);
    callback(null, attrs);
  };

  this.remove = function (attrs, callback) {
  	var idToRemove = attrs.id;
	  for (var i=0;i<self.contacts.length;i++) {
	    if (self.contacts[i].id == idToRemove) {
	      self.contacts.splice(i,1);
	      console.log(self.contacts);
	    }
	  }
	  callback(null, attrs);
	};  

};

module.exports = new ContactsHandler();