var express = require('express');
var app = express();

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

app.listen(port, function () {
	console.log('Example app listening on port: ' + port);
});
