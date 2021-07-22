const User = require('../models/user');

exports.index = (req, res) => {
	User	
	.findAll()
  	.then(results => {
		res.send(results);
  	});	
}

exports.show = (req, res) => {
	User
	.findByPk(req.params.user_id)
	.then(result => res.send(result));
}

