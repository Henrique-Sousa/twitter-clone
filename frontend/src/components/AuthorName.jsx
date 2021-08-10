import React, { Component } from 'react';
import './AuthorName.css';

class AuthorName extends Component { 
	render() {
		return (
			<span className="tweet__author-name"> @{this.props.value}</span>
    	);
	}
}

export default AuthorName;
