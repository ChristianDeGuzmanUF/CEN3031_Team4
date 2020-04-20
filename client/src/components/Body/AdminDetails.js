import React, { Component } from 'react';
import userService from '../../actions/userService';


class AdminDetails extends Component {
    constructor(props) {
        super(props);
        /*Initializing with a random garbage string b/c if the user accidentally hits update with no text, you're stuck in permanent loop of just setting back to nothing.*/
        this.state = {
            userName: "",
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            errors: {}
        };
    }
    componentDidMount = async () =>  {
        if (!this.state.userName && this.props.selectedUserData) {
            this.setState({userName: this.props.selectedUserData.userName});
        }
        if (!this.state.firstName && this.props.selectedUserData) {
            this.setState({firstName: this.props.selectedUserData.firstName});
        }
        if (!this.state.lastName && this.props.selectedUserData) {
            this.setState({lastName: this.props.selectedUserData.lastName});
        }
        if (!this.state.email && this.props.selectedUserData) {
            this.setState({email: this.props.selectedUserData.email});
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedUserData !== this.props.selectedUserData
            && this.props.selectedUser !== nextProps.selectedUser) {
            this.props.updateSelectedUser(nextProps.selectedUser);
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };
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
        userService.updateOne(this.props.selectedUser, userData)
            .then(this.props.updateSelectedUser(this.props.selectedUser))
            .then(this.updateSuccess).then(this.props.getUsers());
    };
    updateSuccess = () => {
        alert('This record has been updated successfully.');
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