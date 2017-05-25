import React, {Component} from 'react';

import secToMin from 'sec-to-min';

class AlbumDetails extends Component {

	constructor(props) {
		super(props);
	};

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
				<span className="tag">
					{tag.name}
				</span>
				);
		});

		return (
			<div className="box main-wrapper">
				<div className="columns is-mobile album-info-row">
					<div className="column is-one-quarter">
						<figure className="image">
							<img className="album-image" 
							src={album.image[album.image.length-2]['#text']} />
						</figure>
					</div>

					<div className="column">
						<p className="album-title">
							{album.name}
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
			</div>

			)

	}
}

export default AlbumDetails;