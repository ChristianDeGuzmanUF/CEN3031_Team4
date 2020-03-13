import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import reset from '../reset-pic.jpg';
import './ResetPassword.css';

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            password1: "",
            password2: "",
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
            password1: this.state.password1,
            password2: this.state.password2,
        };

        this.props.resetPassword(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    goToLogin = () => {
        window.location.href = "/Login";
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="Reset">
                <div class="Reset-container">
                    <div className="Icon">
                        <a href="/"><img src={reset} alt="Logo" /></a>
                        <h1>Career Finder</h1>
                        <h4>Reset Your Password</h4>
                    </div>
                    <form className="Reset-form" noValidate onSubmit={this.onSubmit}>
                        <div className="Reset-form-col-1">
                            <input
                                onChange={this.onChange}
                                value={this.state.password1}
                                error={errors.password1}
                                id="password1"
                                placeholder="New Password"
                                type="password"
                                className={classnames("Register-input", {
                                    invalid: errors.password1
                                })}
                            />
                            <span className="text-danger">{errors.password1}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                placeholder="Confirm New Password"
                                type="password"
                                className={classnames("Register-input", {
                                    invalid: errors.password2
                                })}
                            />
                            <span className="text-danger">{errors.password2}</span>
                            <button className="Reset-button" onClick={this.goToLogin}>Reset Password</button>
                        </div>
                    </form>
                    <div className="credits">
                        Photo by Adrià Tormo on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
                    </div>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
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
)(ResetPassword);
