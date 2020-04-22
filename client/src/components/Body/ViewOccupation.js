import React, { Component } from 'react';
import occupationService from '../../actions/occupationService';
import ClustersForDropdown from './ClustersForDropDown'

class ViewOccupation extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
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

    componentDidMount = async () =>  {
        if (!this.state.name && this.props.selectedOccupationData) {
            this.setState({name: this.props.selectedOccupationData.name});
        }
        if (!this.state.description && this.props.selectedOccupationData) {
            this.setState({description: this.props.selectedOccupationData.description});
        }
        if (!this.state.courses && this.props.selectedOccupationData) {
            this.setState({courses: this.props.selectedOccupationData.courses});
        }
        if (!this.state.education && this.props.selectedOccupationData) {
            this.setState({education: this.props.selectedOccupationData.education});
        }
        if (!this.state.cluster && this.props.selectedOccupationData) {
            this.setState({cluster: this.props.selectedOccupationData.cluster});
        }
        if (!this.state.picture && this.props.selectedOccupationData) {
            this.setState({picture: this.props.selectedOccupationData.picture});
        }
        if (!this.state.pictureCredit && this.props.selectedOccupationData) {
            this.setState({pictureCredit: this.props.selectedOccupationData.pictureCredit});
        }
        if (!this.state.pictureCreditLink && this.props.selectedOccupationData) {
            this.setState({pictureCreditLink: this.props.selectedOccupationData.pictureCreditLink});
        }
        if (!this.state.averageSalary && this.props.selectedOccupationData) {
            this.setState({averageSalary: this.props.selectedOccupationData.averageSalary});
        }
        if (!this.state.link && this.props.selectedOccupationData) {
            this.setState({link: this.props.selectedOccupationData.link});
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedOccupationData !== this.props.selectedOccupationData
            && this.props.selectedOccupation !== nextProps.selectedOccupation) {
            this.props.updateSelectedOccupation(nextProps.selectedOccupation);
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.state.name === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.name = this.props.selectedOccupationData.name;
        }
        else {
            this.state.name = document.getElementById('name').innerText;
        }
        if (this.state.description === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.description = this.props.selectedOccupationData.description;
        }
        else {
            this.state.description = document.getElementById('description').innerText;
        }
        if (this.state.courses === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.courses = this.props.selectedOccupationData.courses;
        }
        else {
            this.state.courses = document.getElementById('courses').innerText;
        }
        if (this.state.education === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.education = this.props.selectedOccupationData.education;
        }
        else {
            this.state.education = document.getElementById('education').innerText;
        }
        if (this.state.cluster === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.cluster = this.props.selectedOccupationData.cluster;
        }
        else {
            this.state.cluster = document.getElementById('cluster').value;
        }
        if (this.state.averageSalary === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.averageSalary = this.props.selectedOccupationData.averageSalary;
        }
        else {
            this.state.averageSalary = document.getElementById('averageSalary').innerText;
        }
        if (this.state.picture === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.picture = this.props.selectedOccupationData.picture;
        }
        else {
            this.state.picture = document.getElementById('picture').innerText;
        }
        if (this.state.pictureCredit === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.pictureCredit = this.props.selectedOccupationData.pictureCredit;
        }
        else {
            this.state.pictureCredit = document.getElementById('pictureCredit').innerText;
        }
        if (this.state.pictureCreditLink === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.pictureCreditLink = this.props.selectedOccupationData.pictureCreditLink;
        }
        else {
            this.state.pictureCreditLink = document.getElementById('pictureCreditLink').innerText;
        }
        if (this.state.link === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.link = this.props.selectedOccupationData.link;
        }
        else {
            this.state.link = document.getElementById('link').innerText;
        }

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

        occupationService.updateOne(this.props.selectedOccupation, occupationData)
            .then(this.props.updateSelectedOccupation(this.props.selectedOccupation))
            .then(this.updateSuccess).then(this.props.getOccupations());
    };
    updateSuccess = () => {
        alert('This record has been updated successfully.');
    };
    deleteOccupation = e => {
        e.preventDefault();
        occupationService.deleteOne(this.props.selectedOccupation);
        this.props.updateSelectedOccupation(null);
        this.props.getOccupations();

    };
    goToPage = () =>{
        window.location.href = "/Occupations/" + this.props.selectedOccupationData.name;
    };
    render() {
        const { errors } = this.state;
        let theChosenOne = null;

        if (this.props.occupations && this.props.occupations.length > 0 &&
            this.props.selectedOccupation !== null && this.props.selectedOccupation !== ""
            && this.props.selectedOccupationData !== null && this.props.selectedOccupationData !== {}) {
            theChosenOne = this.props.selectedOccupationData;
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