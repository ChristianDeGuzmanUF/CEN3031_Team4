import React, { Component } from 'react';

class ClustersForDropDown extends Component {
    render() {
        let clusters = null;

        if (this.props.clusters && this.props.clusters.length > 0 && this.props.thisCluster) {
            clusters = this.props.clusters.map(cluster => {
                return (
                    <option value={cluster.shortName}
                            selected={this.props.thisCluster === cluster.shortName}>{cluster.shortName}</option>
                );
            });
        }
        else {
            return <div>One Moment Please</div>;
        }
        return <select className="selectElement" id="cluster">{clusters}</select>;
    }
}

export default ClustersForDropDown;