import React, { Component } from 'react';
import Feed from './components/feed';

class App extends Component {

	constructor() {
		super();
		this.apiURL = 'http://127.0.0.1:3001';
	}

	render() {
		return (
			<div className="App">
				<Feed apiURL={this.apiURL} />
			</div>
		);
	}
}

export default App;

