import { Component } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';

export default class Feed extends Component {
  static async fetchJSON(url) {
    const response = await fetch(url, { mode: 'cors' });
    const result = await response.json();
    return result;
  }

  constructor(props) {
    super(props);
    this.apiURL = props.apiURL;
    this.state = {
      tweets: [],
    };
  }

  async componentDidMount() {
    try {
      const tweets = await this.constructor.fetchJSON(`${this.apiURL}/tweets`);
      tweets.forEach(async (tweet) => {
        try {
          const user = await this.constructor.fetchJSON(`${this.apiURL}/users/${tweet.author}`);
          const populatedTweet = tweet;
          populatedTweet.authorName = user.name;
          populatedTweet.authorNickName = user.nickname;
          populatedTweet.date = new Date(tweet.date);
          this.setState((prevState) => ({
            tweets: prevState.tweets.concat([populatedTweet]),
          }));
        } catch (err) {
          console.log(err);
        }
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
          <WhatsHappening
            apiURL={this.apiURL}
            setState={
              (tweet) => {
                this.setState((prevState) => ({
                  tweets: [tweet].concat(prevState.tweets),
                }));
              }
            }
          />
        </header>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            authorName={tweet.authorName}
            authorNickName={tweet.authorNickName}
            date={tweet.date}
            text={tweet.text}
          />
        ))}
      </main>
    );
  }
}
