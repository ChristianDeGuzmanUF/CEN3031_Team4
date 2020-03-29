import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import reg from '../reg-pic.jpg'

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
            invitationCode: "",
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
            password2: this.state.password2,
            invitationCode: this.state.invitationCode
        };

        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="main-theme">
                <div className="form-container">
                    <div className="icon">
                        <a href="/"><img src={reg} alt="Logo" /></a>
                        <h1>Career Finder</h1>
                        <h4>Register for an Account</h4>
                    </div>
                    <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                        <div className="double-column-col-1">
                            <input
                                onChange={this.onChange}
                                value={this.state.firstName}
                                error={errors.firstName}
                                id="firstName"
                                placeholder="First Name"
                                type="text"
                            />
                            <span className="text-danger">{errors.firstName}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.userName}
                                error={errors.userName}
                                id="userName"
                                placeholder="Username"
                                type="text"
                            />
                            <span className="text-danger">{errors.userName}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.password1}
                                error={errors.password1}
                                id="password1"
                                placeholder="Password"
                                type="password"
                            />
                            <span className="text-danger">{errors.password1}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                placeholder="Confirm Password"
                                type="password"
                            />
                            <span className="text-danger">{errors.password2}</span>
                        </div>
                        <div className="double-column-col-2">
                            <input
                                onChange={this.onChange}
                                value={this.state.lastName}
                                error={errors.lastName}
                                id="lastName"
                                placeholder="Last Name"
                                type="text"
                            />
                            <span className="text-danger">{errors.lastName}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                placeholder="Email"
                                type="email"
                            />
                            <span className="text-danger">{errors.email}</span>
                            <input
                                onChange={this.onChange}
                                value={this.state.invitationCode}
                                error={errors.invitationCode}
                                id="invitationCode"
                                placeholder="Invitation Code"
                                type="Invitation Code"
                            />
                            <span className="text-danger">{errors.invitationCode}</span>
                            <button className="regular-button" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="credits">
                    Photo by Christin Hume on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
                </div>
            </div>
        );
    }
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

