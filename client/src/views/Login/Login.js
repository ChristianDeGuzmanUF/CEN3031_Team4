<<<<<<< HEAD
import React from 'react';
import login from '../reg-pic.jpg'
import './Login.css';

function Login() {
    const dashboard = () =>{
        //needs fleshed out to determine student vs admin
        window.location.href = "/Dashboard";
    };
    const register = () =>{
        window.location.href = "/Register";
    };
    const recover = () =>{
        window.location.href = "/RecoverPassword";
    };
    return (
        <div className="Login">
            <div className="Login-container">
                <div className="Icon">
                    <img src={login} alt="Logo" />
                    <h1>Career Finder</h1>
                    <h4>Account Login</h4>
                </div>
                <form className="Login-form">
                    <div className="Login-form-col-1">
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                    </div>
                </form>
                <div>
                    <button onClick={dashboard}>Submit</button>
                </div>
                <div>
                    <a className="Link" href="/Register">Register</a>
                </div>
                <div>
                    <a className="Link" href="/RecoverPassword">Forgot Username/Password</a>
                </div>
                <div className="credits">
                    Photo by Christin Hume on Unsplash
                </div>
            </div>
        </div>
    );
}

export default Login;
=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './Login.css';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
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
            userName: this.state.userName,
            password: this.state.password
        };

        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };


    render() {
        const { errors } = this.state;

        return (
            <div>               
                <div class="loginBody text-center">
                    <form class="form-signin" noValidate onSubmit={this.onSubmit}>                    
                    <a href="/"><i class="fa fa-users svgletter" /></a>                    
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <input
                        onChange={this.onChange}
                        value={this.state.userName}
                        error={errors.userName}
                        id="userName"
                        type="text"
                        className={classnames("form-control", {
                            invalid: errors.userName || errors.userNameNotFound
                        })}
                        class="form-control" 
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
                        className={classnames("form-control", {
                            invalid: errors.password || errors.passwordIncorrect
                        })}
                        class="form-control" 
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
                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
                    </form>
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

>>>>>>> master
