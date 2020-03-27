import React from 'react';

const ViewCluster = (props) => {
    if (props.selectedCluster !== 0 && props.selectedCluster !== "")
    {
        // TODO: better way to do this?... 
        var result;
        for (var i = 0; i < props.clusters.length; i++) {
            if (props.clusters[i]._id === props.selectedCluster) {
                result = props.clusters[i];
            }
        }
        return (
            // TODO: pretty print
            <div>
                {JSON.stringify(result)}
            </div>
        );
    };
    return (
        <div>
            <p>
                <i>Click on a name to view more information</i>
            </p>
        </div>
    );
};
export default ViewCluster;
