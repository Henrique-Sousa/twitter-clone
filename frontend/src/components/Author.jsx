import React, { Component } from 'react';
import './Author.css';

class Author extends Component { 
	render() {
		return (
			<p className="author">
				<span>{this.props.nickName}</span>
				<span>{this.props.name}</span>
			</p>
    	);
	}
}

export default Author;

