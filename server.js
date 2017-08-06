const morgan = require('morgan');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var contacts = [];
var contactID = 1;


app.use(morgan('dev'));

app.use(bodyParser.json());




var port = process.env.PORT || 3000;


// GET with localhost:3000/contacts/2 in browser URL will get info on id=2
app.get('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});

// Get with local host:300/contacts in browser URL will list all contacts
app.get('/contacts', function (req, res) {
  return res.status(200).send(contacts);
});

// POST with localhost:3000/contacts will store info in next array element
app.post('/contacts', function (req, res) {
  // grab the posted info
  var contactInfo = req.body;

  // add an id
  contactInfo.id = contactID;

  // increment the id for the next time
  contactID++;

  // add it to the in-memory array
  contacts.push(contactInfo);

  console.log(contacts);

  // tell the message sender that the contact has been added
  res.status(201).send(contactInfo);
});

// PUT with localhost:3000/contacts/2 will replace info for element with id=2
app.put('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts[i] = Object.assign(contacts[i], req.body);
      console.log(req.body);
      console.log(contacts[i]);
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found'});
});

app.delete('/contacts/:id', function (req, res) {
  for (var i=0;i<contacts.length;i++) {
    if (contacts[i].id == Number(req.params.id)) {
      contacts.splice(i,1);
      console.log(contacts);
      return res.status(200).send({ message: 'contact deleted' });
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});
	
app.listen(port, function () {
	console.log('Example app listening on port: ' + port);
});


