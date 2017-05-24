import React, {Component} from 'react';

class AlbumDetails extends Component {

	constructor(props) {
		super(props);
	};

	render() {

		if (!this.props.album) {
			return <div>Loading...</div>
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
					<th>{song.duration}</th>
				</tr>
				)
		});

		return (
			<div className="box">
				<div className="columns is-mobile">
					<div className="column is-one-third">
						<figure className="image is-square album-image">
							<img src={album.image[album.image.length-2]['#text']} />
						</figure>
					</div>

					<div className="column">
						<p className="title">
							{album.name}
						</p>

						<p className="subtitle">
							{album.artist}
						</p>

					</div>
				</div>
				<table className="table">
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