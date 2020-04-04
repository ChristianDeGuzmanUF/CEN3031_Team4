import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';

class ViewCluster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clusterName: "",
            shortName: "",
            description: "",
            skills: [],
            occupations: [],
            errors: {}
        };
    }
    onSubmit = e => {
        e.preventDefault();

        const clusterData = {
            clusterName: this.state.clusterName,
            shortName: this.state.shortName,
            description: this.state.description
        };

        clusterService.updateOne(this.props.selectedCluster, clusterData); 
    };

    render() {
        const { errors } = this.state;
        let theChosenOne = null;

        if (this.props.clusters && this.props.clusters.length > 0 &&
            this.props.selectedCluster !== null && this.props.selectedCluster !== ""
            && this.props.selectedClusterData !== null && this.props.selectedClusterData !== {}) {
            theChosenOne = this.props.selectedClusterData;
                return (
                    <div>
                         <div className="crud-form-container">
                             <div className="crud-title-small">Now viewing: {theChosenOne.shortName}</div>
                             <div className="update-instructions">To make edits to this cluster, type changes into the form below and click the 'update' button at the bottom of the form.</div>
                             <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                                <div className="crud-single-column-col-1">
                                    <div className="crud-form-title">
                                        Cluster Name:

                                    </div>
                                    <textarea placeholder={theChosenOne.clusterName}
                                              value={theChosenOne.clusterName}
                                              onChange={(e) => {
                                                  this.setState({clusterName: e.target.value})
                                              }}
                                    />
                                    <span className="text-danger">
                                        {errors.clusterName}
                                        </span>
                                    <div className="crud-form-title">
                                        Short name for the cluster (appears as the title):
                                    </div>
                                    <textarea placeholder={theChosenOne.shortName}
                                              value={theChosenOne.shortName}
                                              onChange={(e) => {
                                                  this.setState({shortName: e.target.value})
                                              }}
                                    />
                                    <span className="text-danger">
                                        {errors.shortName}
                                        </span>
                                    <div className="crud-form-title">
                                        Cluster Description:
                                    </div>
                                    <textarea placeholder={theChosenOne.description}
                                              value={theChosenOne.description}
                                              onChange={(e) => {
                                                  this.setState({description: e.target.value})
                                              }}
                                    />
                                    <span className="text-danger">
                                        {errors.description}
                                        </span>
                                    <button className="wide-button" type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                        <p>{JSON.stringify(theChosenOne)}</p>
                    </div>
                );
        }
        else {
            return (
                <div className="crud-view-default">
                    <p>
                        <i>Click an item to view all of its information and to make changes.</i>
                    </p>
                </div>
            );
        }
        return <div className="row">{theChosenOne}</div>;
    };
}
export default ViewCluster;
