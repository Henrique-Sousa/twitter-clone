const User = require('../models/user');

exports.index = (req, res) => {
	User	
	.findAll()
  	.then(results => {
		res.send(results);
  	});	
}
