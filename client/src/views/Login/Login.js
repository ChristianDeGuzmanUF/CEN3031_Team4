import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import login from '../reg-pic.jpg'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            admin: false,
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.admin) {
                this.props.history.push("/admin");
            } else { 
                this.props.history.push("/dashboard");
            };
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.auth.isAuthenticated) {
            if (this.props.auth.user.admin) {
                this.props.history.push("/admin");
            } else { 
                this.props.history.push("/dashboard");
            };
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    onChange = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            userName: this.state.userName,
            password: this.state.password,
            admin: this.state.admin
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };


    render() {
        const { errors } = this.state;

        return (
            <div>
                <div className="main-theme">
                    <div class="form-container">
                        <div className="icon">
                            <a href="/"><img src={login} alt="Logo" /></a>
                            <h1>Career Finder</h1>
                            <h4>Account Login</h4>
                        </div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="single-column-col-1">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    type="text"
                                    placeholder="Username"
                                />
                                <span className="text-danger">
                                    {errors.userName}
                                    {errors.userNameNotFound}
                                    </span>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <span className="text-danger">
                                    {errors.password}
                                    {errors.passwordIncorrect}
                                    </span>
                                {/* <div class="checkbox mb-3">
                            <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div> */}
                                <button className="regular-button" type="submit">Sign in</button>
                            </div>
                        </form>
                        <div>
                            <a className="link" href="/Register">Register</a>
                        </div>
                        <div>
                            <a className="link" href="/RecoverPassword">Forgot Username/Password</a>
                        </div>
                    </div>
                </div>
                <div className="credits">
                    Photo by Christin Hume on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
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
)(Login);