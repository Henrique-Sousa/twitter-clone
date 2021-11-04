import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WhatsHappening from './WhatsHappening';
import './HomeMain.css';
import { TweetResult, UserResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';
import Feed from './Feed';
import fetchJSON from '../lib/fetchJSON';

interface Props {
  apiURL: string;
  loggedUser?: UserResult;
}

const HomeMain: FC<Props> = ({ apiURL, loggedUser }: Props) => {

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
      <header>
        <h1>Home</h1>
        <Link to="/logout">Log out</Link>
      </header>
      <WhatsHappening
        loggedUser={loggedUser}
        apiURL={apiURL}
        handleStatusUpdate={
          (tweet: TweetObject) => {
            setTweets((prevState) => (
              [tweet].concat(prevState)
            ));
          }
        }
      />
      <Feed
        loggedUser={loggedUser}
        tweets={tweets}
        handleStatusUpdate={onDeleteTweet}
      />
    </main>
  );
};

HomeMain.defaultProps = {
  loggedUser: undefined,
};

export default HomeMain;
