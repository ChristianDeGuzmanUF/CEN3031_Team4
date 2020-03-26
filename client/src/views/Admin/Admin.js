import React from 'react';

const Admin = (props) => {

    const renderCluster = cluster => {
        return (
            <li key={props.cluster._id} className=''>
                <h3 className="cluster__name">{cluster.shortName}</h3>
            </li>
        );
    };
    console.log(props.clusters);

    return (
        <div className="Admin">
            <h1>Admin Page</h1>
            <div className="list">
                {(props.clusters && props.clusters.length > 0) ? (
                  props.clusters.map(cluster => renderCluster(cluster))
                ) : ( 
                   <p>No clusters found</p>
                )}
            </div>
        </div>
    );
};

export default Admin;