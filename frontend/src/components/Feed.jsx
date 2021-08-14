import { Component } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';

export default class Feed extends Component {
  static async fetchJSON(url) {
    const response = await fetch(url, { mode: 'cors' });
    const tweets = await response.json();
    return tweets;
  }

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  async componentDidMount() {
    try {
      const tweets = await this.constructor.fetchJSON(`${this.props.apiURL}/tweets`);
      tweets.forEach(async (tweet) => {
        try {
          const user = await this.constructor.fetchJSON(`${this.props.apiURL}/users/${tweet.author}`);
          const populatedTweet = tweet;
          populatedTweet.authorName = user.name;
          populatedTweet.authorNickName = user.nickname;
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
    return (
      <div className="feed">
        <div><h1>Home</h1></div>
        <WhatsHappening apiURL={this.props.apiURL} />
        {this.state.tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            authorName={tweet.authorName}
            authorNickName={tweet.authorNickName}
            text={tweet.text}
          />
        ))}
      </div>
    );
  }
}
