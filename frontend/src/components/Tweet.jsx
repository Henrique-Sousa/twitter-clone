import React, { Component } from 'react';
import Text from './Text';
import Author from './Author';
import './Tweet.css';

class Tweet extends Component { 
	render() {
		return (
			<div className="tweet">
				<Author name={this.props.authorName} nickName={this.props.authorNickName} />
				<Text value={this.props.text} />
			</div>
    	);
	}
}

export default Tweet;

