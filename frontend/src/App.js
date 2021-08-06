import React, { Component } from 'react';
import Feed from './components/feed';
import Header from './components/header';
import Sidebar from './components/sidebar';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.apiURL = 'http://127.0.0.1:3001';
	}

	render() {
		return (
			<div className="App">
				<Header />
				<Feed apiURL={this.apiURL} />
				<Sidebar />
			</div>
		);
	}
}

export default App;
