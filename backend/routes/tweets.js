const router = require('express').Router();
const tweetController = require('../controllers/tweetController');

router.get('/', tweetController.index);
router.post('/', tweetController.create);
router.get('/:tweet_id', tweetController.show);
router.put('/:tweet_id', tweetController.update);
router.delete('/:tweet_id', tweetController.destroy);

module.exports = router;
