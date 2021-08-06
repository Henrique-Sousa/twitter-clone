import React, { Component } from 'react';
import './AuthorNickName.css';

class AuthorNickName extends Component { 
	render() {
		return (
			<span className="author__nick-name">{this.props.value}</span>
    	);
	}
}

export default AuthorNickName;
