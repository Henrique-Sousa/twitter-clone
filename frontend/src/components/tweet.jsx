import React, { Component } from 'react';
import Text from './text';
import Author from './author';
import './tweet.css';

class Tweet extends Component { 
	render() {
		return (
			<div className="Tweet">
				<Author value={this.props.author} />
				<Text value={this.props.text} />
			</div>
    	);
	}
}

export default Tweet;

