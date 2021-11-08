import { FC, useState, useEffect } from 'react';
import './UserPageMain.css';
import { TweetResult, UserResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';
import Feed from './Feed';
import UserProfile from './UserProfile';
import fetchJSON from '../lib/fetchJSON';

interface Props {
  apiURL: string;
  user?: UserResult;
  loggedUser?: UserResult;
}

const UserPageMain: FC<Props> = ({ apiURL, user, loggedUser }: Props) => {

  const [tweets, setTweets] = useState<Array<TweetObject>>([]);

  const onDeleteTweet = (tweetId: number): void => {
    setTweets((prevState) => (
      prevState.filter((tweet) => tweet.id !== tweetId)
    ));
  };

  useEffect(() => {
    (async () => {
      try {
        const tweetsResult: Array<TweetResult> = await fetchJSON(`${apiURL}/tweets`);

        tweetsResult.forEach((tweet: TweetResult) => {
          const tweetObject: TweetObject = {
            id: tweet.id,
            text: tweet.text,
            createdAt: new Date(tweet.createdAt),
            user: {
              id: tweet.user.id,
              name: tweet.user.name,
              username: tweet.user.username,
              createdAt: new Date(tweet.user.createdAt),
              photoUrl: tweet.user.photoUrl,
            },
          };
          setTweets((prevState) => (
            prevState.concat([tweetObject])
          ));
        });
      } catch (err) {
        // ..
      }
    })();
  }, []);

  return (
    <main>
      <header style={{ zIndex: 3 }}>
        <h1>{user ? user.name : 'Profile'}</h1>
      </header>
      <UserProfile
        loggedUser={loggedUser}
        user={user}
      />
      <Feed
        loggedUser={loggedUser}
        tweets={tweets}
        handleStatusUpdate={onDeleteTweet}
      />
    </main>
  );
};

UserPageMain.defaultProps = {
  user: undefined,
  loggedUser: undefined,
};

export default UserPageMain;
