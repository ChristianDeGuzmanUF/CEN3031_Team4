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

    openFunction() {
        document.getElementById("myAccount").classList.toggle("show");
    }

    render() {
        const {user} = this.props.auth;

        return (
            <div className="navbar">
                <a href="/Dashboard" className="back-to-dash">
                    {user.userName.split(" ")[0]}'s dashboard!
                </a>
                <div>
                    <input className="Search-bar"
                           placeholder="type a keyword to search"
                           value={this.props.input}
                           onChange={(e) => {
                               this.setState({filterText: e.target.value})
                           }}
                    />
                </div>
                <div className="dropdown">
                    <button className="dropbtn" onClick={this.openFunction}>My Account &nbsp;
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content" id="myAccount">
                        <a href="#">Update Account</a>
                        <a href="#" onClick={this.onLogoutClick}>Logout</a>
                    </div>
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