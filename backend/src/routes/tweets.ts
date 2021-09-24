import { Router } from 'express';
import * as tweetController from '../controllers/tweetController';

const tweets = Router();

tweets.get('/', tweetController.index);
// router.post('/', tweetController.create);
// router.get('/:tweet_id', tweetController.show);
// router.put('/:tweet_id', tweetController.update);
// router.delete('/:tweet_id', tweetController.destroy);

export default tweets;
