import { Router } from 'express';
import tweetController from '../controllers/tweetController';

const tweets = Router();

tweets.get('/', tweetController.index);
tweets.get('/:tweet_id', tweetController.show);

// tweets.post('/', tweetController.create);
// tweets.delete('/:tweet_id', tweetController.destroy);

export default tweets;
