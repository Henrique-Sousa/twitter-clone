import { Component } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';
import { TweetResult } from '../../../shared/ApiResults';
import { TweetObject } from './Objects';

interface Props {
  apiURL: string;
}

interface State {
  tweets: Array<TweetObject>;
}

export default class Feed extends Component<Props, State> {

  apiURL: string;

  static async fetchJSON(url: string): Promise<Array<TweetResult>> {
    const response = await fetch(url, { mode: 'cors' });
    const result = await response.json();
    return result;
  }

  constructor(props: Props) {
    super(props);
    this.apiURL = props.apiURL;
    this.state = {
      tweets: [],
    };
  }

  async componentDidMount() {
    try {
      const tweets: Array<TweetResult> = await Feed.fetchJSON(`${this.apiURL}/tweets`);

      tweets.forEach(async (tweet: TweetResult) => {
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
        this.setState((prevState) => ({
          tweets: prevState.tweets.concat([tweetObject]),
        }));
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { tweets } = this.state;
    return (
      <main className="feed">
        <header>
          <h1 id="home">Home</h1>
        </header>
        <WhatsHappening
          apiURL={this.apiURL}
          handleStatusUpdate={
            (tweet: TweetObject) => {
              this.setState((prevState: State) => ({
                tweets: [tweet].concat(prevState.tweets),
              }));
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
}
