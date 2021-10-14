import { Router } from 'express';
import passport from 'passport';
import {
  getAllTweets, getTweetById, createTweet,
} from '../controllers/tweetController';

const tweets = Router();

tweets.get('/', getAllTweets);
tweets.get('/:id', getTweetById);
tweets.post('/', passport.authenticate('jwt', { session: false }), createTweet);

// tweets.delete('/:tweet_id', tweetController.destroy);

export default tweets;
