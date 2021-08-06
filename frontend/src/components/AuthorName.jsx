import React, { Component } from 'react';
import './AuthorName.css';

class AuthorName extends Component { 
	render() {
		return (
			<span className="author__name"> @{this.props.value}</span>
    	);
	}
}

export default AuthorName;
