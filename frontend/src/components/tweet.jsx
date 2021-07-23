import React, { Component } from 'react';
import Text from './text';
import Author from './author';
import './tweet.css';

class Tweet extends Component { 
	render() {
		return (
			<div className="Tweet">
				<Text value={this.props.text} />
				<Author value={this.props.author} />
			</div>
    	);
	}
}

export default Tweet;

