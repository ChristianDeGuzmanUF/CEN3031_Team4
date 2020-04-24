import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../actions/authActions";
const crypto = require('crypto');


class AccountDetails extends Component {
    constructor(props) {
        super(props);       
        this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            errors: {},
			messages: {}
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
			
			if(this.state.messages.updateSuccess){						
				this.updateSuccess();
			}
        }
    }

    onSubmit = e => {
        e.preventDefault();
       
	    this.state.messages = {};
		this.state.userName = document.getElementById('userName').innerText;       
		this.state.firstName = document.getElementById('firstName').innerText;       
		this.state.lastName = document.getElementById('lastName').innerText;    
		this.state.email = document.getElementById('email').innerText;
        
        const userData = {
			userID: this.props.user._id,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };

		this.props.updateUser(userData, this.props.history);			
    };
    updateSuccess = () => {
        alert('Your account has been updated successfully.');
    };
    goToReset = () =>{
		const token = crypto.randomBytes(20).toString('hex');
        window.location.href = "/ResetPassword/" + token;
    };

    render() {
        const { errors } = this.state;
        let thisUser = null;
		
        if (this.props.user && this.props.user !== null) {
            thisUser = this.props.user;
            let admin = thisUser.isAdmin ? "Yes" : "No";

            return (
                <div>
                    <div className="form-container">
                        <div className="space">
                            <div className="crud-title-tiny">Your Account Details</div>
                            <div className="update-instructions">To update, type changes into the form below and click the 'update' button at the bottom of the form.</div>
                        </div>
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
                                <button className="wide-button" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                    <div className="space">
                        <button className="large-button" onClick={this.goToReset}>Reset Your Password</button>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div className="crud-view-default">
                    <p>
                        <i>Account Details.</i>
                    </p>
                </div>
            );
        }
    };
}

AccountDetails.propTypes = {
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
)(withRouter(AccountDetails));
