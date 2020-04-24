import React, { Component } from 'react';
import occupationService from '../../actions/occupationService';
import ClustersForDropdown from './ClustersForDropDown'

class ViewOccupation extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            name: "",
            description: "",
            courses: "",
            education: "",
            cluster: "",
            averageSalary: "",
            picture: "",
            pictureCredit: "",
            pictureCreditLink: "",
            link: "",
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
        
		this.state.name = document.getElementById('name').innerText;	
		this.state.description = document.getElementById('description').innerText;	
		this.state.courses = document.getElementById('courses').innerText;	
		this.state.education = document.getElementById('education').innerText;	
		this.state.cluster = document.getElementById('cluster').value;	
		this.state.averageSalary = document.getElementById('averageSalary').innerText;	
		this.state.picture = document.getElementById('picture').innerText;	
		this.state.pictureCredit = document.getElementById('pictureCredit').innerText;	
		this.state.pictureCreditLink = document.getElementById('pictureCreditLink').innerText;	
		this.state.link = document.getElementById('link').innerText;
        
        const occupationData = {
            name: this.state.name,
            description: this.state.description,
            courses: this.state.courses,
            education: this.state.education,
            cluster: this.state.cluster,
            averageSalary: this.state.averageSalary,
            picture: this.state.picture,
            pictureCredit: this.state.pictureCredit,
            pictureCreditLink: this.state.pictureCreditLink,
            link: this.state.link,
        };

        occupationService.updateOne(this.props.selectedOccupation._id, occupationData)
            .then(this.updateSuccess)
			.then(this.props.onUpdateOccupationSuccess);			
    };
	
    updateSuccess = () => {
        alert('This record has been updated successfully.');
    };
    deleteOccupation = e => {
        e.preventDefault();
		
        occupationService.deleteOne(this.props.selectedOccupation._id)
			.then(this.updateSuccess)
			.then(this.props.onDeleteOccupationSuccess);
    };	
    goToPage = () =>{
        window.location.href = "/Occupations/" + this.props.selectedOccupation.name;
    };
    render() {
        const { errors } = this.state;
        let theChosenOne = null;

        if (this.props.selectedOccupation !== null) {
			
            theChosenOne = this.props.selectedOccupation;
			
            return (
                <div>
                    <div className="crud-form-container">
                        <div className="crud-title-small">Now viewing: {theChosenOne.name}</div>
                        <div className="update-instructions">To make edits to this occupation, type changes into the form below and click the 'update' button at the bottom of the form.</div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="crud-single-column-col-1">
                                <div className="crud-form-title">
                                    *Occupation Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'name'
                                >{theChosenOne.name}</div>
                                <span className="text-danger">
                                        {errors.name}
                                        </span>
                                <div className="crud-form-title">
                                    *Cluster this occupation belongs to:
                                </div>
                                <ClustersForDropdown
                                    clusters={this.props.clusters}
                                    thisCluster = {theChosenOne.cluster}
                                />
                                <span className="text-danger">
                                        {errors.cluster}
                                        </span>
                                <div className="crud-form-title">
                                    Occupation Description:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'description'
                                >{theChosenOne.description}</div>
                                <span className="text-danger">
                                        {errors.description}
                                        </span>
                                <div className="crud-form-title">
                                    Courses a student should excel in to succeed in this occupation:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'courses'
                                >{theChosenOne.courses}</div>
                                <span className="text-danger">
                                        {errors.courses}
                                        </span>
                                <div className="crud-form-title">
                                    Minimum education level required for this occupation:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'education'
                                >{theChosenOne.education}</div>
                                <span className="text-danger">
                                        {errors.education}
                                        </span>
                                <div className="crud-form-title">
                                    Average salary of this occupation:
                                </div>
                                <div className="crud-form-text">
                                    Please add a single number, without any symbols or decimal places.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'averageSalary'
                                >{theChosenOne.averageSalary}</div>
                                <span className="text-danger">
                                        {errors.averageSalary}
                                        </span>
                                <div className="crud-form-title">
                                    Theme picture for {theChosenOne.name}:
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
                                    Link(s) for {theChosenOne.name}:
                                </div>
                                <div className="crud-form-text">
                                    Add a related link for this occupation, i.e. a video or information page. To add more than one link, separate them with a comma; e.g. https://google.com,https://yahoo.com. Be sure to include https:// at the front of the link.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'link'
                                >{(theChosenOne.link)}</div>
                                <span className="text-danger">
                                        {errors.link}
                                        </span>
                                <div className="required">
                                    *Indicates required field
                                </div>
                                <br></br>
                                <button className="wide-button" type="submit">Update</button>
                                <br></br>
                                <button className="clear-button" onClick={this.goToPage}>Go to the {theChosenOne.name} Page</button>
                                <br></br>
                                <div>
                                    <i className="fa 10x fa-trash" onClick={(e) =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteOccupation(e)}}></i>
                                    <button className="clear-button" onClick={(e) =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteOccupation(e)}}> Delete the {theChosenOne.name} occupation from the database</button>
                                </div>
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
export default ViewOccupation;