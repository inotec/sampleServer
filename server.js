const morgan = require('morgan');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var contacts = [];
var contactID = 100;

/*
app.use(function (req, res, next) {
  console.log(`request made to ${req.method} ${req.originalUrl}`);
  next();
});
*/
app.use(morgan('dev'));

app.use(bodyParser.json());




var port = process.env.PORT || 3000;
/*
app.get('/addViaParams/:numberOne/:numberTwo', function (req, res) {
	// here we can get the two numbers off the params object
	// Converth them to numbers because they come in as strings
	var numberOne = Number(req.params.numberOne);
	var numberTwo = Number(req.params.numberTwo);

	// Then we can respond with the total
	res.send(`${numberOne + numberTwo}`);   // convert back to string
											// notice those are backtick marks not signle quotes

});
*/
app.get('/addViaQuery', function (req, res) {
	var numberOne = Number(req.query.numberOne);
	var numberTwo = Number(req.query.numberTwo);

	res.send(`${numberOne + numberTwo}`);  // convert back to string
})

/*
app.post('/contacts', function (req, res) {
	console.log(req);
	res.send('ok');
});
*/

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

app.get('/contacts/:id', function (req, res) {
  for (var i=0; i<contacts.length; i++) {
    if (contacts[i].id == Number(req.params.id)) {
      return res.status(200).send(contacts[i]);
    }
  }
  return res.status(404).send({ message: 'contact not found' });
});
	
//

app.listen(port, function () {
	console.log('Example app listening on port: ' + port);
});
