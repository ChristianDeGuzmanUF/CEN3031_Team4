import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';

class ViewCluster extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            clusterName: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            shortName: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            description: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            skills: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            studentMessage: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            picture: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            pictureCredit: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            pictureCreditLink: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            salaryRange: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            errors: {}
        };
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.state.clusterName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.clusterName = this.props.selectedClusterData.clusterName;
        }
        else {
            this.state.clusterName = document.getElementById('clusterName').innerText;
        }
        if (this.state.shortName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.shortName = this.props.selectedClusterData.shortName;
        }
        else {
            this.state.shortName = document.getElementById('shortName').innerText;
        }
        if (this.state.description === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.description = this.props.selectedClusterData.description;
        }
        else {
            this.state.description = document.getElementById('description').innerText;
        }
        if (this.state.studentMessage === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.studentMessage = this.props.selectedClusterData.studentMessage;
        }
        else {
            this.state.studentMessage = document.getElementById('studentMessage').innerText;
        }
        if (this.state.picture === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.picture = this.props.selectedClusterData.picture;
        }
        else {
            this.state.picture = document.getElementById('picture').innerText;
        }
        if (this.state.pictureCredit === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.pictureCredit = this.props.selectedClusterData.pictureCredit;
        }
        else {
            this.state.pictureCredit = document.getElementById('pictureCredit').innerText;
        }
        if (this.state.pictureCreditLink === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.pictureCreditLink = this.props.selectedClusterData.pictureCreditLink;
        }
        else {
            this.state.pictureCreditLink = document.getElementById('pictureCreditLink').innerText;
        }
        if (this.state.skills === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.skills = this.props.selectedClusterData.skills;
        }
        else {
            this.state.skills = document.getElementById('skills').innerText;
        }
        if (this.state.salaryRange === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.salaryRange = this.props.selectedClusterData.salaryRange;
        }
        else {
            this.state.salaryRange = document.getElementById('salaryRange').innerText;
        }

        const clusterData = {
            clusterName: this.state.clusterName,
            shortName: this.state.shortName,
            description: this.state.description,
            studentMessage: this.state.studentMessage,
            picture: this.state.picture,
            pictureCredit: this.state.pictureCredit,
            pictureCreditLink: this.state.pictureCreditLink,
            skills: this.state.skills,
            salaryRange: this.state.salaryRange,
        };

        clusterService.updateOne(this.props.selectedCluster, clusterData);
        this.props.getClusters().then(this.updateSuccess);
    };
    updateSuccess = () => {
        alert('This record has been updated successfully.');
    };
    goToPage = () =>{
        window.location.href = "/Clusters/" + this.props.selectedClusterData.shortName;
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
                                    Short name for the cluster:
                                </div>
                                <div className="crud-form-text">
                                    Appears as the title and is used to connect occupations to this cluster.
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
                                    Message for students whose top match is {theChosenOne.shortName}:
                                </div>
                                <div className="crud-form-text">
                                    The student will see this in their dashboard, so it is best to write something like "You got this match because you are good at/enjoy/etc....."
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'studentMessage'
                                     value={this.props.input}
                                >{theChosenOne.studentMessage}</div>
                                <span className="text-danger">
                                        {errors.studentMessage}
                                        </span>
                                <div className="crud-form-title">
                                    Theme picture for {theChosenOne.shortName}:
                                </div>
                                <div className="crud-form-text">
                                    Add a permanent link to a picture. A typical way to do this is to upload your photos to a cloud storage service (cloudinary is a free example) and copy the link they provide.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'picture'
                                     value={this.props.input}
                                >{theChosenOne.picture}</div>
                                <span className="text-danger">
                                        {errors.picture}
                                        </span>
                                <div className="crud-form-title">
                                    Picture Credit
                                </div>
                                <div className="crud-form-text">
                                    If you need to credit a website or person for your picture, add the name here.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'pictureCredit'
                                     value={this.props.input}
                                >{theChosenOne.pictureCredit}</div>
                                <span className="text-danger">
                                        {errors.pictureCredit}
                                        </span>
                                <div className="crud-form-title">
                                    Picture Credit Link
                                </div>
                                <div className="crud-form-text">
                                    If you need to add a link to the creator of your picture, add it here.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'pictureCreditLink'
                                     value={this.props.input}
                                >{theChosenOne.pictureCreditLink}</div>
                                <span className="text-danger">
                                        {errors.pictureCreditLink}
                                        </span>
                                <div className="crud-form-title">
                                    Skills for {theChosenOne.shortName}:
                                </div>
                                <div className="crud-form-text">
                                    Please add a comma separated list of important skills for this cluster:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'skills'
                                     value={this.props.input}
                                >{(theChosenOne.skills)}</div>
                                <span className="text-danger">
                                        {errors.skills}
                                        </span>
                                <div className="crud-form-title">
                                    Salary Range:
                                </div>
                                <div className="crud-form-text">
                                    Add the salary range in the form $10,000-$90,000.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'salaryRange'
                                     value={this.props.input}
                                >{(theChosenOne.salaryRange)}</div>
                                <span className="text-danger">
                                        {errors.salaryRange}
                                        </span>
                                <br></br>
                                <button className="wide-button" type="submit">Update</button>
                                <br></br>
                                <button className="clear-button" onClick={this.goToPage}>Go to the {theChosenOne.shortName} Page</button>
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