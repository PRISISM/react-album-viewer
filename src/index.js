import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import AlbumDetails from './components/album_details';

const API_KEY = 'b6510cbde8044a68c1c10fe084b44a1f';
const SEARCH_API_URL = 'http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=b6510cbde8044a68c1c10fe084b44a1f&format=json&album='
const GET_API_URL = 'http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=b6510cbde8044a68c1c10fe084b44a1f&format=json&mbid='

const myHeaders = new Headers({
	'Access-Control-Allow-Origin':'*'
});

const searchInit = {
	method: 'GET',
	headers: myHeaders,
	mode: 'cors',
	cache: 'default'
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentAlbum: null

		}
		this.getAlbum('4695b1da-7aa4-4df3-add8-5e6a90fa98e4');

	}

	getAlbum(mbid) {
		let searchUrl = GET_API_URL + mbid;

		fetch(searchUrl, searchInit).then((response) => {
			return response.json();
		}).then((results) => {
			console.log(results);
			this.setState({currentAlbum: results.album});
		});
	};

	albumSearch(term) {
		let searchUrl = SEARCH_API_URL + term;

		fetch(searchUrl, searchInit).then((response) => {
			return response.json();
		}).then((results) => {
			console.log(results);
		});
	};

	render() {
		return (
			<div className="container">
				<SearchBar onSearchTermChange={(term) => this.albumSearch(term)} />
				<AlbumDetails album={this.state.currentAlbum}/>

			</div>

			)

	}

}

ReactDOM.render(
    <App />
  ,document.querySelector('#app'));
