import React, { Component } from 'react';
import './AuthorNickName.css';

class AuthorNickName extends Component { 
	render() {
		return (
			<span className="tweet__author-nickname">{this.props.value}</span>
    	);
	}
}

export default AuthorNickName;
