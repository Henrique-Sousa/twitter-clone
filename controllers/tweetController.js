const Tweet = require('../models/tweet');

exports.index = (req, res) => {  
	Tweet	
	.findAll()
  	.then(results => {
		res.send(results);
  	});	
}
