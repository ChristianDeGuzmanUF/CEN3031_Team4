import React, { Component } from 'react';
import occupationService from '../../actions/occupationService';
import Navbar from  '../../components/Body/NavBar';

class OccupationAdd extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            name: "",
            description: "",
            courses: "",
            education: "",
            cluster: "",
            averageSalary: "0",
            picture: "",
            link: "",
            errors: {}
        };
    }

    onSubmit = e => {
        e.preventDefault();
        this.state.name = document.getElementById('name').innerText;
        this.state.description = document.getElementById('description').innerText;
        this.state.courses = document.getElementById('courses').innerText;
        this.state.education = document.getElementById('education').innerText;
        this.state.cluster = document.getElementById('cluster').innerText;
        this.state.picture = document.getElementById('picture').innerText;
        this.state.link = document.getElementById('link').innerText;

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

        occupationService.createOne(occupationData).then(() => window.location.href = "/Admin/Occupation");
    };

    render() {
        const { errors } = this.state;
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="form-container">
                    <div className="crud-title-small">Add an Occupation Below</div>
                    <div className="update-instructions">To add an occupation, type changes into the form below and click the 'add' button at the bottom of the form.</div>
                    <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                        <div className="crud-single-column-col-1">
                            <div className="crud-form-title">
                                Occupation Name:
                            </div>
                            <div className="textareaElement"
                                 contentEditable="true"
                                 id = 'name'
                                 value={this.props.input}
                            ></div>
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
                            ></div>
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
                            ></div>
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
                            ></div>
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
                            ></div>
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
                            ></div>
                            <span className="text-danger">
                                    {errors.averageSalary}
                                    </span>
                            <div className="crud-form-title">
                                Theme picture for the new occupation:
                            </div>
                            <div className="crud-form-text">
                                Please add a hyperlink.
                            </div>
                            <div className="textareaElement"
                                 contentEditable="true"
                                 id = 'picture'
                                 value={this.props.input}
                            ></div>
                            <span className="text-danger">
                                    {errors.picture}
                                    </span>
                            <div className="crud-form-title">
                                A link for the new occupation:
                            </div>
                            <div className="crud-form-text">
                                Add a related link for this occupation, i.e. a video or information page.
                            </div>
                            <div className="textareaElement"
                                 contentEditable="true"
                                 id = 'link'
                                 value={this.props.input}
                            ></div>
                            <span className="text-danger">
                                    {errors.link}
                                    </span>
                            <br></br>
                            <button className="regular-button" type="submit">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default OccupationAdd;