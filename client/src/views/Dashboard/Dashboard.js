import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard.css';

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {user} = this.props.auth;

        return (
            <div className="Dashboard">
                <div className="Toolbar">
                    <div className="Welcome-box">
                        Welcome, {user.userName.split(" ")[0]}!
                    </div>
                    <div>
                        <input className="Search-bar" placeholder="type a keyword to search" />
                    </div>
                    <div>
                        <button className="Dashboard-button" onClick={this.onLogoutClick}>Logout</button>
                    </div>
                </div>
                <div className="Dashboard-container">
                    You are logged in to your dashboard on Career Finder
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
