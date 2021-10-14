import { Router } from 'express';
import passport from 'passport';
import {
  getAllTweets, getTweetById, createTweet, deleteTweet,
} from '../controllers/tweetController';

const tweets = Router();

tweets.get('/', getAllTweets);
tweets.get('/:id', getTweetById);
tweets.post('/', passport.authenticate('jwt', { session: false }), createTweet);
tweets.delete('/:id', passport.authenticate('jwt', { session: false }), deleteTweet);

export default tweets;
