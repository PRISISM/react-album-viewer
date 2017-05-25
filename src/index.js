import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Handlebars from 'handlebars';
import Loader from 'react-loader';

import SearchBar from './components/search_bar';
import AlbumDetails from './components/album_details';
import Footer from './components/footer';

const API_KEY = 'b6510cbde8044a68c1c10fe084b44a1f';
const SEARCH_API_URL = 'http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=b6510cbde8044a68c1c10fe084b44a1f&format=json&album='

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
			currentAlbum: null,
			loaded: false
		}

	}

	getAlbum(name, artist) {
		let searchUrl = `http://ws.audioscrobbler.com/2.0/?method=album.getinfo
		&api_key=b6510cbde8044a68c1c10fe084b44a1f
		&format=json
		&album=${name}
		&artist=${artist}`;

		fetch(searchUrl, searchInit).then((response) => {
			return response.json();
		}).then((results) => {
			this.setState({
				currentAlbum: results.album,
				loaded: true
			});
		});
	};

	render() {
		return (
			<Loader loaded={this.state.loaded} className="react-loading" scale={2.00}>
				<div className="container outer-container">
					<SearchBar />
					<AlbumDetails album={this.state.currentAlbum}/>
				</div>
				<Footer />
			</Loader>
			)
	}

	componentDidMount() {
		this.getAlbum('The Blue Hearts', 'The Blue Hearts');

		// Bloodhound
		var albums = new Bloodhound({
			datumTokenizer: function (datum) {
				return Bloodhound.tokenizers.whitespace(datum.value);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				wildcard: '%QUERY',
				url:'http://ws.audioscrobbler.com/2.0/?method=album.search&api_key=b6510cbde8044a68c1c10fe084b44a1f&format=json&album=%QUERY',
				filter: function(albums) {
					// Map the remote source JSON array to a JS object array
					return $.map(albums.results.albummatches.album, function(album) {
						return {
							value: album.name,
							id: album.url,
							artist: album.artist
						};
					});
				}

			}
		});
		albums.initialize();

		// Typeahead
		$('.typeahead').typeahead({
			hint: false,
			highlight: true,
			minLength: 3
		}, {
			source: albums.ttAdapter(),
			display: 'value',
			templates: {
				suggestion: Handlebars.compile('<div class="suggest-text"><span>{{value}}</span> - {{artist}}</div>')
			}
		}).on('typeahead:selected', function(obj, datum) {
			this.getAlbum(datum.value, datum.artist);
		}.bind(this));
	}
}

ReactDOM.render(
    <App />
  ,document.querySelector('#app'));
