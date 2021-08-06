import React, { Component } from 'react';
import './WhatsHappening.css';

class WhatsHappening extends Component { 
	constructor(props) {
		super(props);
		this.state = {
			author: -1,
			text: ""
		};

		this.submit = this.submit.bind(this);
	}

	async submit(event) {
		event.preventDefault();

		const tweet = {
			author: this.state.author,
			text: this.state.text
		}

		if (tweet.text != '' && tweet.author >= 0) {
			await fetch(`${this.props.apiURL}/tweets`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(tweet)
			});
		}
	}

	render() {
		return (
			<form onSubmit={this.submit}> 
				<textarea
					name="text"
					placeholder="What's happening?"
					minlength="1"
					maxlength="280"
					onChange={ e => this.setState({text: e.target.value}) }
				/>
				<div>
					<label htmlFor="author">Author</label>
					<input 
						type="number"
						name="author"
						onChange={ e => this.setState({author: e.target.value}) }
					/>
				</div>
				<button type="submit"> Tweet </button>
			</form>
		);
	}

}

export default WhatsHappening;
