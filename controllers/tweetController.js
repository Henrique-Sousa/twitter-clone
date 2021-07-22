const Tweet = require('../models/tweet');

exports.index = (req, res) => {  
	Tweet	
	.findAll()
  	.then(results => {
		res.send(results);
  	});	
}

exports.create = (req, res) => {
	Tweet
	.create({
		author: req.body.author,
		date: Date.now(),
		text: req.body.text
	})
	.then(tweet => res.send(tweet));
}
