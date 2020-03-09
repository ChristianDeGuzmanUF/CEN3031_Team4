import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <main role="main" class="container">
                <div class="starter-template">
                    <h1>Dashboard</h1>
                    <p class="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
                </div>
                <div>
                    <h4>
                        <b>Hey there,</b> {user.userName.split(" ")[0]}
                        <p className="flow-text grey-text text-darken-1">
                            You are logged into a Career Finder
                        </p>
                    </h4>
                    <button onClick={this.onLogoutClick}>Logout</button>
                </div>
            </main>
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
