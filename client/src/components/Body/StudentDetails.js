import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/authActions";
import userService from '../../actions/userService';

class StudentDetails extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            userName: "",
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            errors: {},
			messages: {},
			postbackUpdate: "",
        };
    }
	
   componentWillReceiveProps(nextProps) {	
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
		
		if (nextProps.messages) {
            this.setState({
                messages: nextProps.messages
            });
			
			if(this.state.messages.updateSuccess == "Update Success" && this.state.postbackUpdate == "yes")
			{
				this.updateSuccess();
				this.props.onUpdateStudentSuccess();
				this.state.messages.updateSuccess = "";
			}			
        }
		
		if( nextProps.selectedStudent && this.props.selectedStudent) {
			if( nextProps.selectedStudent._id !== this.props.selectedStudent._id) {
				//student changed, reset errors	
				this.setState({
					errors: {}
				});
			}
		}
    }
    
    onSubmit = e => {
        e.preventDefault();
       
	    //this.state.messages = {};
		this.state.postbackUpdate = "yes";
		this.state.userName = document.getElementById('userName').innerText;        
		this.state.firstName = document.getElementById('firstName').innerText;        
		this.state.lastName = document.getElementById('lastName').innerText;        
		this.state.email = document.getElementById('email').innerText;        

        const userData = {
			userID: this.props.selectedStudent._id,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };
		
        this.props.updateUser(userData, this.props.history);
    };
    updateSuccess = () => {
        alert('This record has been updated successfully.');
    };
    deleteUser = e => {
        e.preventDefault();
		
        userService.deleteOne(this.props.selectedStudent._id)
			.then(this.updateSuccess)
			.then(this.props.onDeleteStudentSuccess);
    };

    render() {
        const { errors } = this.state;
        let thisUser = null;

        if (this.props.selectedStudent !== null) {
			
            thisUser = this.props.selectedStudent;
            let admin = thisUser.isAdmin ? "Yes" : "No";
            let points = 0;

            //conditional string assignments
            if (thisUser.topMatches.one !== "") {
                points += 20;
            }
            let clusters = thisUser.clusters;

            Object.keys(clusters).forEach(function(key) {
                if(clusters[key] === true){
                    // cluster visited
                    points += 5;
                }
            });
            return (
                <div>
                    <div className="crud-form-container">
                        <div className="crud-title-tiny">{thisUser.firstName}'s Account Details</div>
                        <div className="update-instructions">To update, type changes into the form below and click the 'update' button at the bottom of the form.</div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="crud-single-column-col-1">
                                <div className="crud-form-title">
                                    *First Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'firstName'
                                >{thisUser.firstName}</div>
                                <span className="text-danger">
                                        {errors.firstName}
                                        </span>
                                <div className="crud-form-title">
                                    *Last Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'lastName'
                                >{thisUser.lastName}</div>
                                <span className="text-danger">
                                        {errors.lastName}
                                        </span>
                                <div className="crud-form-title">
                                    *User Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'userName'
                                >{thisUser.userName}</div>
                                <span className="text-danger">
                                        {errors.userName}
                                        </span>
                                <div className="crud-form-title">
                                    *Email Address:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'email'
                                >{thisUser.email}</div>
                                <span className="text-danger">
                                        {errors.email}
                                        </span>
                                <div className="crud-form-title">
                                    Is a site administrator: {admin}
                                </div>
                                <div className="required">
                                    *Indicates required field
                                </div>
                                <br></br>
                                <div>
                                    <button className="regular-button" type="submit">Update</button>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <i className="fa 10x fa-trash" onClick={(e) =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUser(e)}}></i>
                                        <button className="clear-button" onClick={(e) =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUser(e)}}> Delete {thisUser.firstName}'s Account</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="student-item-box">
                            <div className="crud-title-tiny">Top Matches:</div>
                            <tr className="attrib-detail">1. {thisUser.topMatches.one !== "" ? thisUser.topMatches.one : 'N/A'}</tr>
                            <tr className="attrib-detail">2. {thisUser.topMatches.two !== "" ? thisUser.topMatches.two : 'N/A'}</tr>
                            <tr className="attrib-detail">3. {thisUser.topMatches.three !== "" ? thisUser.topMatches.three : 'N/A'}</tr>
                            <tr className="crud-title-tiny">
                                Points: {points}
                            </tr>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="crud-view-default">
                    <p>
                        <i>Click on a name to the left to view and edit account details.</i>
                    </p>
                </div>
            );
        }
    };
}

StudentDetails.propTypes = {
    updateUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
	messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
	messages: state.messages
});

export default connect(
    mapStateToProps,
    { updateUser }
)(withRouter(StudentDetails));
