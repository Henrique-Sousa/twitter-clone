import { Component } from 'react';
import WhatsHappening from './WhatsHappening';
import Tweet from './Tweet';
import './Feed.css';

export default class Feed extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			tweets: []
		};
	}

	async fetchJSON(url) {
		const response = await fetch(url, { mode: 'cors' });
		const tweets = await response.json();
		return tweets;
	}

	async componentDidMount() {
		let tweets, user;
		do {
			try {
				tweets = await this.fetchJSON(`${this.props.apiURL}/tweets`);
				for (let tweet of tweets) {
					try {
						user = await this.fetchJSON(`${this.props.apiURL}/users/${tweet.author}`);
						tweet.authorName = user.name;
						tweet.authorNickName = user.nickname;
						this.setState({
							tweets: this.state.tweets.concat([tweet])
						});
					} catch(err) {
						console.log(err);
					}
				}
			} catch(err) {
				console.log(err);
			}
		} while (tweets === undefined || user === undefined);
	}

	render() {
		return (
			<div className="feed">
				<div><h1>Home</h1></div>
				<WhatsHappening apiURL={this.props.apiURL} />
				{this.state.tweets.map(tweet => 
					<Tweet key={tweet.id} authorName={tweet.authorName} authorNickName={tweet.authorNickName} text={tweet.text} />
				)}

			</div>
    	);
	}
}

