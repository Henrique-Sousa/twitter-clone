import React, { Component } from 'react';
import AuthorName from './AuthorName';
import AuthorNickName from './AuthorNickName';

class Author extends Component { 
	render() {
		return (
			<p className="tweet__author-area">
				<AuthorNickName value={this.props.nickName} />
				<AuthorName value={this.props.name} />
			</p>
    	);
	}
}

export default Author;
