import { Router } from 'express';
import {
  getAllTweets, getTweetById, createTweet,
} from '../controllers/tweetController';

const tweets = Router();

tweets.get('/', getAllTweets);
tweets.get('/:id', getTweetById);
tweets.post('/', createTweet);

// tweets.delete('/:tweet_id', tweetController.destroy);

export default tweets;
