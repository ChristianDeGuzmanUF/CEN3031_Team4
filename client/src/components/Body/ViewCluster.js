import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';

class ViewCluster extends Component {
    constructor(props) {
        super(props);		
        this.state = {
            clusterName: "",
            shortName: "",
            description: "",
            skills: "",
            studentMessage: "",
            picture: "",
            pictureCredit: "",
            pictureCreditLink: "",
            salaryRange: "",
            errors: {}
        };
    }	

    componentWillReceiveProps(nextProps) {			
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();
      
		this.state.clusterName = document.getElementById('clusterName').innerText;
		this.state.shortName = document.getElementById('shortName').innerText;
		this.state.description = document.getElementById('description').innerText;
		this.state.studentMessage = document.getElementById('studentMessage').innerText;
		this.state.picture = document.getElementById('picture').innerText;
		this.state.pictureCredit = document.getElementById('pictureCredit').innerText;
		this.state.pictureCreditLink = document.getElementById('pictureCreditLink').innerText;
		this.state.skills = document.getElementById('skills').innerText;
		this.state.salaryRange = document.getElementById('salaryRange').innerText;
        
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
		
        clusterService.updateOne(this.props.selectedCluster._id, clusterData)          
            .then(this.updateSuccess)
			.then(this.props.onUpdateClusterSuccess);
			
    };
	
	
    updateSuccess = () => {
        alert('This record has been updated successfully.');
    };
    goToPage = () =>{
        window.location.href = "/Clusters/" + this.props.selectedCluster.shortName;
    };
    render() {
        const { errors } = this.state;
        let theChosenOne = null;

        if (this.props.selectedCluster !== null) {			
				
            theChosenOne = this.props.selectedCluster;
			
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
                                <div className="crud-form-text">
                                    This name cannot be changed because it is used by the matching survey.
                                </div>
                                <div className="textareaElement-no-edit"
                                     contentEditable="false"
                                     id = 'clusterName'
                                >{theChosenOne.clusterName}</div>
                                <span className="text-danger">
                                        {errors.clusterName}
                                        </span>
                                <div className="crud-form-title">
                                    *Short name for the cluster:
                                </div>
                                <div className="crud-form-text">
                                    Appears as the title and is used to connect occupations to this cluster.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'shortName'									 
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
                                     >{theChosenOne.description}</div>
                                <span className="text-danger">
                                        {errors.description}
                                        </span>
                                <div className="crud-form-title">
                                    *Message for students whose top match is {theChosenOne.shortName}:
                                </div>
                                <div className="crud-form-text">
                                    The student will see this in their dashboard, so it is best to write something like "People who work in "this-cluster" are good at/enjoy/etc....."
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'studentMessage'
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
                                >{(theChosenOne.salaryRange)}</div>
                                <span className="text-danger">
                                        {errors.salaryRange}
                                        </span>
                                <div className="required">
                                    *Indicates required field
                                </div>
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