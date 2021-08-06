import React, { Component } from 'react';
import './author.css';

class Author extends Component { 
	render() {
		return (
			<p className="Author">{this.props.value}</p>
    	);
	}
}

export default Author;

