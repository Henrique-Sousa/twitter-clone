import { FC, useState, useEffect } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';
import { TweetResult } from '../lib/ApiResult';
import { TweetObject } from './Objects';

interface Props {
  apiURL: string;
}

const Feed: FC<Props> = (props: Props) => {

  const [tweets, setTweets] = useState<Array<TweetObject>>([]);

  const apiURL: string = props.apiURL;

  const fetchJSON = async (url: string): Promise<Array<TweetResult>> => {
    const response = await fetch(url, { mode: 'cors' });
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    (async () => {
      try {
        const tweets: Array<TweetResult> = await fetchJSON(`${apiURL}/tweets`);

        tweets.forEach((tweet: TweetResult) => {
          let tweetObject: TweetObject = {
            id: tweet.id,
            text: tweet.text,
            createdAt: new Date(tweet.createdAt),
            user: {
              id: tweet.user.id,
              name: tweet.user.name,
              username: tweet.user.username,
              createdAt: new Date(tweet.user.createdAt),
            }
          };
          setTweets((prevState) => (
            prevState.concat([tweetObject])
          ));
        });
      } catch (err) {
        console.log(err);
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
          name={tweet.user.name}
          username={tweet.user.username}
          date={tweet.createdAt}
          text={tweet.text}
        />
      ))}
    </main>
  );
}

export default Feed;
