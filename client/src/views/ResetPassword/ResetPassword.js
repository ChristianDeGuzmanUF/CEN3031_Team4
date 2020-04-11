import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword } from "../../actions/authActions";
import userService from "../../actions/userService";
import classnames from "classnames";
import reset from '../reset-pic.jpg';

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
			token: props.match.params.token,
            password1: "",
            password2: "",
            errors: {},
			user:null,
        };
		
		this.getUserByToken = this.getUserByToken.bind(this);   
    }
	
	getUserByToken = async (token) => {
        let res = await userService.getOneByToken(token);
        this.setState({user: res});
    };
	
	componentDidMount = async () => {      
        if (!this.state.user || this.state.user === null) {
            this.getUserByToken(this.state.token);
        }
    };

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

    render() {
        const { errors } = this.state;

        return (
            <div className="main-theme">
                <div class="form-container">
                    <div className="icon">
                        <a href="/"><img src={reset} alt="Logo" /></a>
                        <h1>Career Finder</h1>
                        <h4>Reset Your Password</h4>
                    </div>
                    <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                        <div className="single-column-col-1">
                            <input
                                onChange={this.onChange}
                                value={this.state.password1}
                                error={errors.password1}
                                id="password1"
                                placeholder="New Password"
                                type="password"
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
                            <button className="regular-button" type="submit">Reset Password</button>
                        </div>
                    </form>
                </div>
                <div className="credits">
                    Photo by Adrià Tormo on <a className="credit_link" href = "https://Unsplash.com" target="_blank">Unsplash</a>
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
    { resetPassword }
)(ResetPassword);
