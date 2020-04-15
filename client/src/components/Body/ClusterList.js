import React, { Component } from 'react';

class ClusterList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(id, e) {
        e.preventDefault();
        this.props.updateSelectedCluster(id);
    };

    render() {
    let clusterList = null;

    if (this.props.clusters && this.props.clusters.length > 0) {
        clusterList = this.props.clusters.map(cluster => {
            if(cluster.clusterName.toLowerCase().includes(this.props.filterText.toLowerCase())
            || cluster.description.toLowerCase().includes(this.props.filterText.toLowerCase())
                || cluster.skills.toLowerCase().includes(this.props.filterText.toLowerCase())) {
                return (
                    <tr key={cluster._id} onClick={(e) => this.clickHandler(cluster._id, e)}>
                        <td>
                            <tr className="attrib-title">
                                {cluster.shortName}
                            </tr>
                            <tr className="attrib-detail">
                                {cluster.description}
                            </tr>
                        </td>
                    </tr>
                );
            }
            return null;
        });
    }

    return <div>{clusterList}</div>;
};
}
export default ClusterList;
