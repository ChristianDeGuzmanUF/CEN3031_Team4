import React, { Component } from 'react';
import occupationService from '../../actions/occupationService';

class ViewOccupation extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            name: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            description: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            courses: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            education: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            cluster: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            averageSalary: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            picture: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            link: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            errors: {}
        };
    }

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
            this.state.cluster = document.getElementById('cluster').innerText;
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
            link: this.state.link,
        };

        occupationService.updateOne(this.props.selectedOccupation, occupationData);
        this.props.getOccupations();
    };
    deleteOccupation = e => {
        e.preventDefault();
        occupationService.deleteOne(this.props.selectedOccupation);
        this.props.updateSelectedOccupation(null);
        this.props.getOccupations();

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
                                    Occupation Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'name'
                                     value={this.props.input}
                                >{theChosenOne.name}</div>
                                <span className="text-danger">
                                        {errors.name}
                                        </span>
                                <div className="crud-form-title">
                                    Occupation Description:
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
                                    Courses a student should excel in to succeed in this occupation:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'courses'
                                     value={this.props.input}
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
                                     value={this.props.input}
                                >{theChosenOne.education}</div>
                                <span className="text-danger">
                                        {errors.education}
                                        </span>
                                <div className="crud-form-title">
                                    Cluster this occupation belongs to:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'cluster'
                                     value={this.props.input}
                                >{theChosenOne.cluster}</div>
                                <span className="text-danger">
                                        {errors.cluster}
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
                                     value={this.props.input}
                                >{theChosenOne.averageSalary}</div>
                                <span className="text-danger">
                                        {errors.averageSalary}
                                        </span>
                                <div className="crud-form-title">
                                    Theme picture for {theChosenOne.name}:
                                </div>
                                <div className="crud-form-text">
                                    Please add a hyperlink.
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
                                    A link for {theChosenOne.name}:
                                </div>
                                <div className="crud-form-text">
                                    Add a related link for this occupation, i.e. a video or information page.
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'link'
                                     value={this.props.input}
                                >{(theChosenOne.link)}</div>
                                <span className="text-danger">
                                        {errors.link}
                                        </span>
                                <br></br>
                                <button className="wide-button" type="submit">Update</button>
                                <br></br>
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