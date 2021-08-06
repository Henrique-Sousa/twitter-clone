import React, { Component } from 'react';

class Text extends Component { 
	render() {
		return (
			<p>{this.props.value}</p>
    	);
	}
}

export default Text;

