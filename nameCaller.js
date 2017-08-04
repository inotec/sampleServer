function NameCaller() {
	var self = this;

	this.message = 'hello';

	this.callName = function (name) {
		console.log('your name is ' + name + ' and you are a poopyface');
	};

	this.sayMessage = function () {
		console.log('the message is: ' + self.message);
	}
}

module.exports = new NameCaller();