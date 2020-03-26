import React, { useState, useEffect } from 'react';
import clusterService from '../../actions/clusterService'

const Admin = (props) => {

    const [clusters, setClusters] = useState(null);
	useEffect(() => {
		if(!clusters) {
			getClusters();
		};
	});

	const getClusters = async () => {
		let res = await clusterService.getAll();
		setClusters(res);
    }

    const renderCluster = cluster => {
        return (
            <li key={cluster._id} className=''>
                <h3 className="cluster__name">{cluster.shortName}</h3>
            </li>
        );
    };
    console.log(props.clusters);

    return (
        <div className="Admin">
            <h1>Admin Page</h1>
            <div className="list">
                {(clusters && clusters.length > 0) ? (
                  clusters.map(cluster => renderCluster(cluster))
                ) : ( 
                   <p>No clusters found</p>
                )}
            </div>
        </div>
    );
};

export default Admin;