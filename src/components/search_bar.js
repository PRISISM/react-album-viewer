import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = {term: ''};
	}

	render() {
		return (
			<div className="control bloodhound">
				<input 
				className="input typeahead"
				/>
			</div>
		);
	}

	// onInputChange(term) {
	// 	this.setState({term});
	// 	this.props.onSearchTermChange(term);
	// };

}

export default SearchBar;