const router = require('express').Router();
const tweet_controller = require('../controllers/tweetController');

router.get('/', tweet_controller.index);
router.post('/', tweet_controller.create);
router.get('/:tweet_id', tweet_controller.show);
router.put('/:tweet_id', tweet_controller.update);
router.delete('/:tweet_id', tweet_controller.destroy);

module.exports = router;
