import React, { Component } from 'react';
import userService from '../../actions/userService';


class AdminDetails extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            userName: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            id: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            firstName: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            lastName: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            email: "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf",
            errors: {}
        };
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.userName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.userName = this.props.selectedUserData.userName;
        }
        else {
            this.state.userName = document.getElementById('userName').innerText;
        }
        if (this.state.firstName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.firstName = this.props.selectedUserData.firstName;
        }
        else {
            this.state.firstName = document.getElementById('firstName').innerText;
        }
        if (this.state.lastName === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.lastName = this.props.selectedUserData.lastName;
        }
        else {
            this.state.lastName = document.getElementById('lastName').innerText;
        }
        if (this.state.email === "1248qfhaefh982q3ryq2h4fg89q24ty1824tyyhq2984ytfghf") {
            this.state.email = this.props.selectedUserData.email;
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

        userService.updateOne(this.props.selectedUser, userData);
        this.props.getUsers();
    };
    deleteUser = e => {
        e.preventDefault();
        userService.deleteOne(this.props.selectedUser);
        this.props.updateSelectedUser(null);
        this.props.getUsers();

    };

    render() {
        const { errors } = this.state;
        let thisUser = null;

        if (this.props.users && this.props.users.length > 0 &&
            this.props.selectedUser !== null && this.props.selectedUser !== ""
            && this.props.selectedUserData !== null && this.props.selectedUserData !== {}) {
            thisUser = this.props.selectedUserData;
            let admin = thisUser.isAdmin ? "Yes" : "No";
            return (
                <div>
                    <div className="crud-form-container">
                        <div className="crud-title-tiny">{thisUser.firstName}'s Account Details</div>
                        <div className="update-instructions">To update, type changes into the form below and click the 'update' button at the bottom of the form.</div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="crud-single-column-col-1">
                                <div className="crud-form-title">
                                    First Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'firstName'
                                     value={this.props.input}
                                >{thisUser.firstName}</div>
                                <span className="text-danger">
                                        {errors.firstName}
                                        </span>
                                <div className="crud-form-title">
                                    Last Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'lastName'
                                     value={this.props.input}
                                >{thisUser.lastName}</div>
                                <span className="text-danger">
                                        {errors.lastName}
                                        </span>
                                <div className="crud-form-title">
                                    User Name:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'userName'
                                     value={this.props.input}
                                >{thisUser.userName}</div>
                                <span className="text-danger">
                                        {errors.userName}
                                        </span>
                                <div className="crud-form-title">
                                    Email Address:
                                </div>
                                <div className="textareaElement"
                                     contentEditable="true"
                                     id = 'email'
                                     value={this.props.input}
                                >{thisUser.email}</div>
                                <span className="text-danger">
                                        {errors.email}
                                        </span>
                                <div className="crud-form-title">
                                    Is a site administrator: {admin}
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

export default AdminDetails;