import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {term: ''};
	}

	render() {
		return (
			<div className="bloodhound search-wrapper has-text-centered">
				<input 
				className="input is-outlined is-large typeahead"
				/>
			</div>
		);
	}


}

export default SearchBar;