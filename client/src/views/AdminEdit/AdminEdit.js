import React, { Component } from 'react';
import userService from '../../actions/userService';
import AdminList from '../../components/Body/AdminList';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AdminDetails from "../../components/Body/AdminDetails";

class AdminEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            filterText: "",
            selectedUser: null,
            selectedUserData: null
        };
        this.getUsers = this.getUsers.bind(this);
        this.updateSelectedUser = this.updateSelectedUser.bind(this);
    }
    getUsers = async () => {
        let res = await userService.getAll();
        this.setState({users: res});
    };
    getOneUser = async (id) => {
        return await userService.getOne(id);
    };
    componentDidMount = async () => {
        if (!this.state.users) {
            this.getUsers();
        }
    };
    updateSelectedUser(id) {
        this.setState({selectedUser: id});
        this.getOneUser(id).then(res => {this.setState({selectedUserData: res})})
    };

    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="row">
                    <div className="column1">
                        <div className="crud-search">
                            <div className="crud-title">Administrators</div>
                            <input className="search-bar"
                                   placeholder="type a keyword to filter items below"
                                   value={this.props.input}
                                   onChange={(e) => {
                                       this.setState({filterText: e.target.value})
                                   }}
                            />
                        </div>
                        <div className="user-cards-container">
                            <div className="with-scroll-short">
                                <AdminList
                                    users={this.state.users}
                                    filterText={this.state.filterText}
                                    selectedUser={this.state.selectedUser}
                                    updateSelectedUser={this.updateSelectedUser}
                                    getUsers={this.getUsers}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <AdminDetails
                            selectedUser={this.state.selectedUser}
                            selectedUserData={this.state.selectedUserData}
                            updateSelectedUser={this.updateSelectedUser}
                            users={this.state.users}
                            getUsers={this.getUsers}
                        />
                    </div>
                </div>
            </div>
        );
    };
}
AdminEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(AdminEdit)