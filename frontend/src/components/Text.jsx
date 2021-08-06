import React, { Component } from 'react';
import './Text.css';

class Text extends Component { 
	render() {
		return (
			<p className="text">{this.props.value}</p>
    	);
	}
}

export default Text;

