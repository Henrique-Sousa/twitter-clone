import React, { Component } from 'react';
import Tweet from './tweet';

class Feed extends Component { 
	constructor() {
		super();
		this.state = {
			tweets: []
		};
	}

	componentDidMount() {
		fetch('http://127.0.0.1:3001/tweets', { mode: 'cors' })
			.then(res => res.json())
			.then(tweets => {
				for (let tweet of tweets) {
					fetch(`http://127.0.0.1:3001/users/${tweet.author}`, { mode: 'cors' })
						.then(res => res.json())
						.then(user => 
							{
								tweet.author = user.nickname;
								this.setState({
									tweets: this.state.tweets.concat([tweet])
								});
							})
						.catch(err => console.log(err));
				}
			})
			.catch(err => console.log(err));
	}

	render() {
		const tweets = [];
		for (const [index, tweet] of this.state.tweets.entries()) {
			const { author, text } = tweet;
			tweets.push(<Tweet key={index} author={author} text={text} />)
		}
		return (
			<div>
				{tweets}
			</div>
    	);
	}
}

export default Feed;

