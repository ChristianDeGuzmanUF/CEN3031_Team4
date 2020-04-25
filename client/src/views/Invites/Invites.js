import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import inviteService from '../../actions/inviteService';
import NavBar from '../../components/Body/NavBar';
import StudentInviteList from '../../components/Body/StudentInviteList';
import AdminInviteList from '../../components/Body/AdminInviteList';
import AddStudentInvite from '../../components/Body/AddStudentInvite';
import AddAdminInvite from "../../components/Body/AddAdminInvite";

class Invites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentInvites: null,
            adminInvites: null
        };
		this.getStudentInvites = this.getStudentInvites.bind(this);  
		this.getAdminInvites = this.getAdminInvites.bind(this);  
		this.deleteStudentInviteSuccess = this.deleteStudentInviteSuccess.bind(this);
		this.deleteAdminInviteSuccess = this.deleteAdminInviteSuccess.bind(this);
		this.addStudentInviteSuccess = this.addStudentInviteSuccess.bind(this);
		this.addAdminInviteSuccess = this.addAdminInviteSuccess.bind(this);
    }
    getStudentInvites = async () => {
        let res = await inviteService.getOneAdminCode(false);
        this.setState({studentInvites: res});
    };
    getAdminInvites = async () => {
        let res = await inviteService.getOneAdminCode(true);
        this.setState({adminInvites: res});
    };
    componentDidMount = async () => {
        if (!this.state.studentInvites) {
            this.getStudentInvites();
        }
        if (!this.state.adminInvites) {
            this.getAdminInvites();
        }
    };
	
	deleteStudentInviteSuccess() {
		this.getStudentInvites();		   
    };	
	
	deleteAdminInviteSuccess() {
		this.getAdminInvites();		   
    };

	addStudentInviteSuccess() {
		this.getStudentInvites();		   
    };	
	
	addAdminInviteSuccess() {
		this.getAdminInvites();		   
    };	

    render() {
        return (
            <div className="main-theme">
                <NavBar/>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <div className="crud-title">Student Invite Codes</div>
                                <div className="user-cards-container">
                                    <div>
                                        <AddStudentInvite
                                            studentInvites={this.state.studentInvites}
                                            onAddStudentInviteSuccess={this.addStudentInviteSuccess} 
                                        />
                                    </div>
                                    <div className="with-scroll-short">
                                        <StudentInviteList
                                            studentInvites={this.state.studentInvites}                                            
											onDeleteStudentInviteSuccess={this.deleteStudentInviteSuccess} 
                                        />
                                    </div>
                                </div>
                            </table>
                        </div>
                    </div>
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <div className="crud-title">Admin Invite Codes</div>
                                <div className="user-cards-container">
                                    <div>
                                        <AddAdminInvite
                                            adminInvites={this.state.adminInvites}
                                            onAddAdminInviteSuccess={this.addAdminInviteSuccess} 
                                        />
                                    </div>
                                    <div className="with-scroll-short">
                                        <AdminInviteList
                                            adminInvites={this.state.adminInvites}
                                            onDeleteAdminInviteSuccess={this.deleteAdminInviteSuccess} 
                                        />
                                    </div>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

Invites.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Invites);