import { FC } from 'react';
import Tweet from './Tweet';
import { UserResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';

interface Props {
  loggedUser?: UserResult;
  tweets: Array<TweetObject>;
  handleStatusUpdate: (tweetId: number) => void;
}

const Feed: FC<Props> = ({ loggedUser, tweets, handleStatusUpdate }: Props) => (
  <div>
    {tweets.map((tweet: TweetObject) => (
      <Tweet
        key={tweet.id}
        tweetId={tweet.id}
        name={tweet.user.name}
        username={tweet.user.username}
        date={tweet.createdAt}
        text={tweet.text}
        photoUrl={tweet.user.photoUrl}
        loggedUser={loggedUser}
        handleStatusUpdate={handleStatusUpdate}
      />
    ))}
  </div>
);

Feed.defaultProps = {
  loggedUser: undefined,
};

export default Feed;
