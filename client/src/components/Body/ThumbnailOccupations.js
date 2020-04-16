import React, { Component } from 'react';
import './ThumbnailCareers.css'

class ThumbnailOccupations extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let thumbnailOccupations = null;

        if (this.props.occupations && this.props.occupations.length > 0) {
            thumbnailOccupations = this.props.occupations.map(occupation => {
                let linkName = "/Occupations/" + occupation.name;
                return (
                    <div className="col-md-3">
                        <div className="card mb-3 cc">
							<a href={linkName} className="cluster-link">
								{occupation.name}
								</a>
						</div>
                    </div>
				);
            });
        }
        else {
            return <div>One moment please. If nothing appears, this cluster does not have any related occupations.</div>;
        }
        return <div className="row">{thumbnailOccupations}</div>;
    };
}

export default ThumbnailOccupations;