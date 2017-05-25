import React, {Component} from 'react';

import EllipsisText from 'react-ellipsis-text';
import secToMin from 'sec-to-min';

class AlbumDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			loaded: false
		}
	};

	componentDidMount() {
		this.onSuccess();
	}

	onSuccess() {
		this.setState({loaded: true})
	}

	render() {

		if (!this.props.album) {

			return null;
		}


		const album = this.props.album;

		const albumTracks = album.tracks.track.map((song, index) => {
			return (
				<tr key={song.name}>
					<th>{index+1}</th>
					<th>
						<a target="_blank" href={song.url}>
							{song.name}
						</a>
					</th>
					<th>{secToMin(song.duration)}</th>
				</tr>
				)
		});

		const albumTags = album.tags.tag.map((tag) => {
			return (
				<span className="tag" key={tag.name}>
					{tag.name}
				</span>
				);
		});

		var albumImage = "";

		if (album.image[album.image.length-2]['#text'] == "") {
			var albumImage = 'http://placehold.it/250x250';
		}
		else {
			var albumImage = album.image[album.image.length-2]['#text'];
		}

		return (
			<section className="section box main-wrapper">
				<div className="columns is-mobile album-info-row">
					<div className="column is-one-quarter">
						<figure className="image">
							<img className="album-image" 
							src={albumImage} />
						</figure>
					</div>

					<div className="column">
						<p className="album-title">
							<EllipsisText text={album.name} length={25} tooltip={true} />
						</p>

						<p className="subtitle">
							by {album.artist}
						</p>
						<p className="tags-info">
							Top tags from Last.fm:
						</p>
						<div className="tags">
							{albumTags}
						</div>
					</div>
				</div>
				<table className="table track-table">
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Duration</th>
						</tr>
					</thead>
					<tbody>
						{albumTracks}
					</tbody>
				</table>
			</section>
			)

	}
}

export default AlbumDetails;