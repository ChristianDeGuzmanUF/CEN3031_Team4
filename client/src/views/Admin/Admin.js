import React, { Component } from 'react';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import userService from "../../actions/userService";
import Welcome from '../../components/Body/UserWelcome';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        this.getUser = this.getUser.bind(this);
    }
    getUser = async (id) => {
        let res = await userService.getOne(id);
        this.setState({user: res});
    };
    componentDidMount = async () => {
        if (!this.state.user || this.state.user === null) {
            this.getUser(this.props.auth.user.id);
        }
    };
    updateAccount = () => {
        window.location.href = "UpdateAccount";
    };
    studentInvite = () => {
        alert('Your student Invitation Code is: 123456789.');
    };
    adminInvite = () => {
        alert('Your administrator Invitation Code is: 00.');
    };
    goToStudentEdit = () =>{
        window.location.href = "/Admin/Student";
    };goToAdminEdit = () =>{
        window.location.href = "/Admin/Admin";
    };
    goToClusterEdit = () =>{
        window.location.href = "/Admin/Cluster";
    };
    goToOccupationEdit = () =>{
        window.location.href = "/Admin/Occupation";
    };
    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="welcome-row">
                    <Welcome user={this.state.user}/>
                    <button className="account-update-button" onClick={this.updateAccount}>Update Your Account Details</button>
                </div>
                <div className="options-title-small"> Administrator Control Options</div>
                <div className="crud-single-column-col-1">
                    <button className="large-button" onClick={this.studentInvite}>Get A Student Invite Code</button>
                    <button className="large-button" onClick={this.adminInvite}>Get An Administrator Invite Code</button>
                    <button className="large-button" onClick={this.goToStudentEdit}>View, Edit, or Delete Students</button>
                    <button className="large-button" onClick={this.goToAdminEdit}>View, Edit, or Delete Administrators</button>
                    <button className="large-button" onClick={this.goToClusterEdit}>View or Edit Career Clusters</button>
                    <button className="large-button" onClick={this.goToOccupationEdit}>View, Edit, Add, or Delete Occupations</button>
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
