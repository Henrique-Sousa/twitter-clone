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

exports.show = (req, res) => {
	Tweet
	.findByPk(req.params.tweet_id)
	.then(result => res.send(result));
}

exports.update = (req, res) => {
	Tweet.
	update(
		{ text: req.body.text },
		{ where: { id: req.params.tweet_id } }
	)
	.then(result => res.send(result));
}

exports.destroy = (req, res) => {
	Tweet.
	destroy({
		where: { id: req.params.tweet_id } 
	}).then(res.end());
}

