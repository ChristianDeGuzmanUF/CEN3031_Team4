import React from 'react';

const ClusterList = (props) => {

    function clickHandler(id, e) {
        e.preventDefault();
        props.setSelectedCluster(id);
    };

    var clusterList = null;

    if (props.clusters && props.clusters.length > 0) {
        clusterList = props.clusters.map(cluster => {
            if(cluster.clusterName.toLowerCase().includes(props.filterText.toLowerCase())
            || cluster.description.toLowerCase().includes(props.filterText.toLowerCase())) {
                return (
                    <tr key={cluster._id} onClick={(e) => clickHandler(cluster._id, e)}>
                        <td>{cluster.shortName} </td>
                        <td>{cluster.description}</td>
                    </tr>
                );
            }
            return null;
        });
    }

    return <div>{clusterList}</div>;
};
export default ClusterList;
