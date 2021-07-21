const router = require('express').Router();
const tweet_controller = require('../controllers/tweetController');

router.get('/', tweet_controller.index);

module.exports = router;
