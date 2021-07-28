const Tweet = require('../models/tweet');

exports.index = async (req, res) => {  
	const results = await Tweet.findAll();
	res.send(results);
}

exports.create = async (req, res) => {
	const tweet = await Tweet.create({
		author: req.body.author,
		date: Date.now(),
		text: req.body.text
	});
	res.send(tweet);
}

exports.show = async  (req, res) => {
	const result = await Tweet.findByPk(req.params.tweet_id);
	res.send(result);
}

exports.update = async (req, res) => {
	const result = await Tweet.update(
		{ text: req.body.text },
		{ where: { id: req.params.tweet_id } }
	);
	res.send(result);
}

exports.destroy = async (req, res) => {
	await Tweet.destroy({
		where: { id: req.params.tweet_id } 
	});
	res.end();
}

