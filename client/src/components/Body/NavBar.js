import React, { Component } from "react";
import PropTypes from "prop-types";
import './NavBar.css';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class NavBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        let dash;

        if (this.props.auth.user.admin) {
            dash = "/Admin";
        }
        else {
            dash = "Dashboard";
        }
        return (
            <div className="navbar">
                <div className='take-back-links'>
                    <a href="/">
                        <i className="fa fa-home"></i>
                    </a>
                    <a href={dash} className="back-to-dash">
                        dashboard
                    </a>
                </div>
                <div>
                    <button className="logout-button" onClick={this.onLogoutClick}>Logout</button>
                </div>
            </div>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(NavBar);