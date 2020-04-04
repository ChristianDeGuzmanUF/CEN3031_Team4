
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

        if (this.state.clusterName === "") {
            this.state.clusterName = this.props.selectedClusterData.clusterName;
        }
        else {
            this.state.clusterName = document.getElementById('clusterName').innerText;
        }
        if (this.state.shortName === "") {
            this.state.shortName = this.props.selectedClusterData.shortName;
        }
        else {
            this.state.shortName = document.getElementById('shortName').innerText;
        }
        if (this.state.description === "") {
            this.state.description = this.props.selectedClusterData.description;
        }
        else {
            this.state.description = document.getElementById('description').innerText;
        }

        const clusterData = {
            clusterName: this.state.clusterName,
            shortName: this.state.shortName,
            description: this.state.description
        };

        clusterService.updateOne(this.props.selectedCluster, clusterData);
        this.props.getClusters();
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
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'clusterName'
                                     value={this.props.input}
                                >{theChosenOne.clusterName}</div>
                                <span className="text-danger">
                                        {errors.clusterName}
                                        </span>
                                <div className="crud-form-title">
                                    Short name for the cluster (appears as the title):
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'shortName'
                                     value={this.props.input}
                                     >{theChosenOne.shortName}</div>
                                <span className="text-danger">
                                        {errors.shortName}
                                        </span>
                                <div className="crud-form-title">
                                    Cluster Description:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'description'
                                     value={this.props.input}
                                     >{theChosenOne.description}</div>
                                <span className="text-danger">
                                        {errors.description}
                                        </span>
                                <div className="crud-form-title">
                                    Skills for {theChosenOne.shortName}:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     value={this.props.input}
                                     >{JSON.stringify(theChosenOne.skills)}</div>
                                <span className="text-danger">
                                        {errors.skills}
                                        </span>
                                <div className="crud-form-title">
                                    Occupations in {theChosenOne.shortName}:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     value={this.props.input}
                                     >{JSON.stringify(theChosenOne.occupations)}</div>
                                <span className="text-danger">
                                        {errors.occupations}
                                        </span>
                                <br></br>
                                <button className="wide-button" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
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