import React, { Component } from 'react';

class ViewCluster extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.clusters && this.props.clusters.length > 0) {
            if (this.props.selectedCluster !== null && this.props.selectedCluster !== "") {
                // TODO: better way to do this?... 
                var result;
                for (var i = 0; i < this.props.clusters.length; i++) {
                    if (this.props.clusters[i]._id === this.props.selectedCluster) {
                        result = this.props.clusters[i];
                    }
                }
                return (
                    // TODO: pretty print
                    <div>
                        {JSON.stringify(result)}
                    </div>
                );
            };
        };
        return (
            <div>
                <p>
                    <i>Click on a name to view more information</i>
                </p>
            </div>
        );
    }
}
export default ViewCluster;
