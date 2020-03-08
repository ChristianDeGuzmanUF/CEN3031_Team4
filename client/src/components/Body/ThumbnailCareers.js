import React, {useState, useEffect} from 'react';

const ThumbnailCareers = (props) => {   

    const thumbnailCareers = props.data.map(career => {  
        console.log(career.name);
		console.log(career.description);
		
		var opts = {};
		opts['data-src'] = "holder.js/100px225?size=20&theme=thumb&bg=55595c&fg=eceeef&text=" + career.name;   	
		
        return (    
			<div className="col-md-3">
				<div className="card mb-3 box-shadow">
					<img className="card-img-top" {...opts} alt="Card image cap" />
					<div className="card-body">
						<p className="card-text">{career.description}</p>
					</div>
				</div>
			</div>
        );            
    });

    return <div className="row">{thumbnailCareers}</div>;
};

export default ThumbnailCareers;
