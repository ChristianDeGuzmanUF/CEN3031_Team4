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
                        <div>User's Account Details here</div>
                        <button className="regular-button">Update Account</button>
                    </div>
                </div>
                <div className="temp-todo-box">
                    <div>Admin Control Options</div>
                    <button className="regular-button">Get A Student Invite Code</button>
                    <button className="regular-button">Get An Administrator Invite Code</button>
                    <div> Invites trigger creation of a code + storage in db + pop up that shows code</div>
                    <button className="regular-button" onClick={this.goToStudentEdit}>View, Edit, or Delete Students</button>
                    <button className="regular-button" onClick={this.goToAdminEdit}>View or Delete Administrators</button>
                    <button className="regular-button" onClick={this.goToClusterEdit}>View or Edit Career Clusters</button>
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
