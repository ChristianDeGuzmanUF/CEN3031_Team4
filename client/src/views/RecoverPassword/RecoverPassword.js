import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import recover from '../recover-pic.jpg';

class RecoverPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
        };

        this.props.recoverUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    /*What I am thinking is that here we just post "Recovery email sent" the same way that we would show an error
    and just leave this page a dead end, but jumping to reset for mock up*/
    goToResetPassword = () => {
        window.location.href = "/ResetPassword";
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="main-theme">
                <div class="form-container">
                    <div className="icon">
                        <a href="/"><img src={recover} alt="Logo" /></a>
                        <h1>Career Finder</h1>
                        <h4>Account Recovery</h4>
                    </div>
                    <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                        <div className="single-input-form">
                            <input

                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="text"
                                placeholder="Enter Recovery Email Address"
                            />
                            <span className="text-danger">
                                    {errors.email}
                                    {errors.userNameNotFound}
                                    </span>
                            <button className="wide-button" onClick={this.goToResetPassword}>Send Recovery Email</button>
                        </div>
                    </form>
                </div>
                <div className="credits">
                    Photo by Shane Avery on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
                </div>
            </div>
        );
    }
}

RecoverPassword.propTypes = {
    recoverUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(RecoverPassword);
