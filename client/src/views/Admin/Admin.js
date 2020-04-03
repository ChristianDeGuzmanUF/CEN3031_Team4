import React, { Component } from 'react';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Admin extends Component {
    goToStudentEdit = () =>{
        window.location.href = "/Admin/Student";
    };goToAdminEdit = () =>{
        window.location.href = "/Admin/Admin";
    };
    goToClusterEdit = () =>{
        window.location.href = "/Admin/Cluster";
    };
    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="user-welcome">
                    Welcome 'first name'!
                </div>
                <div>
                    <div className="temp-todo-box">
                        <div>Account Details</div>
                        <div>Users Account Details here (compact)</div>
                        <button className="regular-button">Update Account</button>
                        <div>Clicking button takes to acct update page</div>
                    </div>
                </div>
                <div className="temp-todo-box">
                    <div>Admin Control Options</div>
                    <div> Make less ugly, group into columns</div>
                    <button className="regular-button">Get A Student Invite Code</button>
                    <button className="regular-button">Get An Administrator Invite Code</button>
                    <div> Invites trigger creation of a code + storage in db + pop up that shows code need popups</div>
                    <button className="regular-button" onClick={this.goToStudentEdit}>Add, Edit, or Delete Students</button>
                    <button className="regular-button" onClick={this.goToAdminEdit}>Add or Delete Administrators</button>
                    <button className="regular-button" onClick={this.goToClusterEdit}>Add, Edit, or Delete Career Clusters</button>
                    <div>These crud buttons just take to page that looks like bootcamp 4, list on side, filter at top, click shows detail w/ button to edit add or delete</div>
                </div>
            </div>
        );
    };
}
Admin.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Admin)
