import React, { Component } from 'react';
import userService from '../../actions/userService';
const crypto = require('crypto');


class AccountDetails extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            errors: {}
        };
    }
    componentDidMount = async () =>  {
        if (!this.state.userName && this.props.user) {
            this.setState({userName: this.props.user.userName});
        }
        if (!this.state.firstName && this.props.user) {
            this.setState({firstName: this.props.user.firstName});
        }
        if (!this.state.lastName && this.props.user) {
            this.setState({lastName: this.props.user.lastName});
        }
        if (!this.state.email && this.props.user) {
            this.setState({email: this.props.user.email});
        }
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.state.userName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.userName = this.props.user.userName;
        }
        else {
            this.state.userName = document.getElementById('userName').innerText;
        }
        if (this.state.firstName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.firstName = this.props.user.firstName;
        }
        else {
            this.state.firstName = document.getElementById('firstName').innerText;
        }
        if (this.state.lastName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.lastName = this.props.user.lastName;
        }
        else {
            this.state.lastName = document.getElementById('lastName').innerText;
        }
        if (this.state.email === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.email = this.props.user.email;
        }
        else {
            this.state.email = document.getElementById('email').innerText;
        }

        const userData = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        };

        userService.updateOne(this.props.user._id, userData)
            .then(this.props.getUser(this.props.user._id))
            .then(this.updateSuccess);
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

export default AccountDetails;