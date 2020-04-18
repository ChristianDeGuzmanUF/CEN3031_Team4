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
    goToInviteEdit = () =>{
        window.location.href = "/Admin/Invites";
    };
    goToStudentEdit = () =>{
        window.location.href = "/Admin/Student";
    };
    goToAdminEdit = () =>{
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
                <div className="dash-pic">
                    <div className="options-title-small"> Administrator Control Options</div>
                    <div className="crud-single-column-col-1-narrow">
                        <button className="large-button" onClick={this.goToInviteEdit}>Add or Delete Invite Codes</button>
                        <button className="large-button" onClick={this.goToStudentEdit}>View, Edit, or Delete Students</button>
                        <button className="large-button" onClick={this.goToAdminEdit}>View, Edit, or Delete Administrators</button>
                        <button className="large-button" onClick={this.goToClusterEdit}>View or Edit Career Clusters</button>
                        <button className="large-button" onClick={this.goToOccupationEdit}>View, Edit, Add, or Delete Occupations</button>
                    </div>
                </div>
                <div className="credits">
                    Photo by <a className="credit_link" href = "https://www.vecteezy.com/free-vector/captain" target="_blank">Captain Vectors by Vecteezy</a>
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
