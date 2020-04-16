import React, { Component } from 'react';
import './ThumbnailCareers.css'

class ThumbnailCareers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let thumbnailCareers = null;

        if (this.props.clusters && this.props.clusters.length > 0) {
            thumbnailCareers = this.props.clusters.map(cluster => {
                let linkName = "/Clusters/" + cluster.shortName;
                return (
                    <div className="col-md-3">
                        <div className="card mb-3 cc">
							<a href={linkName} className="cluster-link">
								{cluster.shortName}
								</a>
						</div>
                    </div>
				);
            });
        }
        else {
            return <div>One Moment Please</div>;
        }
        return <div className="row">{thumbnailCareers}</div>;
    };
}

export default ThumbnailCareers;