const router = require('express').Router();
const tweet_controller = require('../controllers/tweetController');

router.get('/', tweet_controller.index);
router.post('/', tweet_controller.create);

module.exports = router;
