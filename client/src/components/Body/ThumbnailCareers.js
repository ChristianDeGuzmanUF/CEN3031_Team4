import React, {useState, useEffect} from 'react';
import './ThumbnailCareers.css'

const ThumbnailCareers = (props) => {
	const goToCareer = (name) => {
        window.location.href = "/Careers/" + name;
	};

    const thumbnailCareers = props.data.map(cluster => {  
        console.log(cluster.clusterName);
		console.log(cluster.description);
		
		var opts = {};
		opts['data-src'] = "holder.js/100px225?size=20&theme=thumb&bg=42cd42&fg=f8f8ff&text=" + cluster.clusterName;
		
        return (    
			<div className="col-md-3">
				<div className="card mb-3 box-shadow">
					<img className="card-img-top" {...opts} alt="Card image cap"/>
				</div>
			</div>
        );            
    });

    return <div className="row">{thumbnailCareers}</div>;
};

export default ThumbnailCareers;

/****Can add this back in if we think it enhances the page
 * <div className="card-body">
 <p className="card-text">{career.description}</p>
 </div>
 */

/***Can't get this on click working no matter where I put it. Saving button styling, but would rather have the image be the link. <button className="view-button" onClick={goToCareer(career.name)}>View</button>***/

