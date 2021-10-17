import { FC, useState, useEffect } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';
import { TweetResult, UserResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';
import fetchJSON from '../lib/fetchJSON';

interface Props {
  apiURL: string;
  loggedUser?: UserResult;
}

const Feed: FC<Props> = ({ apiURL, loggedUser }: Props) => {

  const [tweets, setTweets] = useState<Array<TweetObject>>([]);

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
    <main className="feed">
      <header>
        <h1 id="home">Home</h1>
      </header>
      <WhatsHappening
        apiURL={apiURL}
        handleStatusUpdate={
          (tweet: TweetObject) => {
            setTweets((prevState) => (
              [tweet].concat(prevState)
            ));
          }
        }
      />
      {tweets.map((tweet: TweetObject) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          name={tweet.user.name}
          username={tweet.user.username}
          date={tweet.createdAt}
          text={tweet.text}
          loggedUser={loggedUser}
        />
      ))}
    </main>
  );
};

Feed.defaultProps = {
  loggedUser: undefined,
};

export default Feed;
