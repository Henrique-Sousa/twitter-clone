import React, { Component } from 'react';
import WhatsHappening from './whats-happening';
import Tweet from './tweet';
import './feed.css';

class Feed extends Component { 
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
						tweet.author = user.nickname;
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
		const tweets = [];
		for (const [index, tweet] of this.state.tweets.entries()) {
			const { author, text } = tweet;
			tweets.push(<Tweet key={index} author={author} text={text} />)
		}
		return (
			<div className="Feed">
				<div><h1>Home</h1></div>
				<WhatsHappening apiURL={this.props.apiURL} />
				{tweets}
			</div>
    	);
	}
}

export default Feed;

