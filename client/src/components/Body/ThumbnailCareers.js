import React from 'react';
import './ThumbnailCareers.css'

const ThumbnailCareers = props => {
	const goToCareer = (name) => {
        console.log('click on ' + name);
	};
	var thumbnailCareers = null;

	if (props.data && props.data.length > 0) {
    thumbnailCareers = props.data.map(cluster => {  
		
		var opts = {};
		opts['data-src'] = "holder.js/100px225?size=20&theme=thumb&bg=42cd42&fg=f8f8ff&text=" + cluster.shortName;
		var linkName = "/Clusters/" + cluster.shortName;
        return (
			<div className="col-md-3 col-sm-6 col-xs-12">
				<div className="card mb-3">
					<a href={linkName}>
                        <img className="card-img-top" {...opts} alt="Card image cap"/>
					</a>
				</div>
			</div>
        );            
	});
	} else {
		return <div></div>;
	}

    return <div className="row">{thumbnailCareers}</div>;
};

export default ThumbnailCareers;