<<<<<<< HEAD
import React from 'react';
import reg from '../reg-pic.jpg'
import DatePicker from 'react-date-picker';
import './Register.css';

function Register() {
    const dashboard = () =>{
        //needs fleshed out to determine student vs admin
        window.location.href = "/Dashboard";
    };
    return (
        <div className="Register">
            <div className="Register-container">
                <div className="Icon">
                    <img src={reg} alt="Logo" />
                    <h1>Career Finder</h1>
                    <h4>Register for an Account</h4>
                </div>
                <form className="Register-form">
                    <div className="Register-form-col-1">
                        <input type="text" placeholder="First Name"/>
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                        <input type="text" placeholder="Confirm Password"/>
                    </div>

                    <div className="Register-form-col-2">
                        <input type="text" placeholder="Last Name"/>
                        <input type="text" placeholder="Invitation Code"/>
                        <DatePicker
                            name="Date of Birth"
                            dateFormat="MM/DD/YYYY"/>
                    </div>
                </form>
                <div>
                    <button onClick={dashboard}>Submit</button>
                </div>

                <div className="credits">
                    Photo by Christin Hume on Unsplash
                </div>
            </div>
        </div>
    );
=======
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";


class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",            
            userName: "",
            email: "",
            password1: "",
            password2: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
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

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,            
            userName: this.state.userName,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div>
                    <div>
                        <Link to="/">Career Finder</Link>
                        <div>
                            <b>Register account</b>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.firstName}
                                    error={errors.firstName}
                                    id="firstName"
                                    placeholder="first name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.firstName
                                    })}
                                />
                                <span className="red-text">{errors.firstName}</span>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.lastName}
                                    error={errors.lastName}
                                    id="lastName"
                                    placeholder="last name"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.lastName
                                    })}
                                />
                                <span className="red-text">{errors.lastName}</span>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.userName}
                                    error={errors.userName}
                                    id="userName"
                                    placeholder="username"
                                    type="text"
                                    className={classnames("", {
                                        invalid: errors.userName
                                    })}
                                />
                                <span className="red-text">{errors.userName}</span>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    placeholder="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email
                                    })}
                                />
                                <span className="red-text">{errors.email}</span>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password1}
                                    error={errors.password1}
                                    id="password1"
                                    placeholder="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password1
                                    })}
                                />
                                <span className="red-text">{errors.password1}</span>
                            </div>
                            <div>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    placeholder="confirm password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password2
                                    })}
                                />
                                <span className="red-text">{errors.password2}</span>
                            </div>
                            <div>
                                <button type="submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

>>>>>>> master
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));

