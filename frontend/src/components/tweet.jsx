import React, { Component } from 'react';
import Text from './text';
import Author from './author';
import './tweet.css';

class Tweet extends Component { 
	render() {
		return (
			<div className="Tweet">
				<Author name={this.props.authorName} nickName={this.props.authorNickName} />
				<Text value={this.props.text} />
			</div>
    	);
	}
}

export default Tweet;

