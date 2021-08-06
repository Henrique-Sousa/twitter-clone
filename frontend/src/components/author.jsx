import React, { Component } from 'react';
import './author.css';

class Author extends Component { 
	render() {

		return (
			<p className="Author">
				<span>{this.props.nickName}</span>
				<span>{this.props.name}</span>
			</p>
    	);
	}
}

export default Author;

