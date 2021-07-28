const User = require('../models/user');

exports.index = async (req, res) => {
	const results = await User.findAll();
	res.send(results);
}

exports.show = async (req, res) => {
	const result = await User.findByPk(req.params.user_id)
	res.send(result);
}

