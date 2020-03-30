import React, { Component } from 'react';

class ClusterList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(id, e) {
        e.preventDefault();
        //this.props.setSelectedCluster(id);
        this.props.updateSelectedCluster(id);
    };

    render() {
    var clusterList = null;
    const selectedCluster = this.props.selectedCluster;

    if (this.props.clusters && this.props.clusters.length > 0) {
        clusterList = this.props.clusters.map(cluster => {
            if(cluster.clusterName.toLowerCase().includes(this.props.filterText.toLowerCase())
            || cluster.description.toLowerCase().includes(this.props.filterText.toLowerCase())) {
                return (
                    <tr key={cluster._id} onClick={(e) => this.clickHandler(cluster._id, e)}>
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
};
export default ClusterList;
