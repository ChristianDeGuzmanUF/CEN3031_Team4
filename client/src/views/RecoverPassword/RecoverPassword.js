import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { recoverUser } from "../../actions/authActions";
import recover from '../Captain.png';

class RecoverPassword extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            errors: {},
			messages: {}
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
		
		 if (nextProps.messages) {
            this.setState({
                messages: nextProps.messages
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

        this.props.recoverUser(userData, this.props.history); // we are not doing redirect, pass this.props.history as a parameter
    };
	
	goToRegister = () =>{
        window.location.href = "/Register";
    };

    render() {
        const { errors } = this.state;
		const { messages } = this.state;
		
		let showEmailNotRecognized = false;
		let showEmailSent = false;

		if(messages.emailNotRecognized){			
			showEmailNotRecognized = true;
		}
		
		if(messages.emailSent){			
			showEmailSent = true;
		}

        return (
            <div>
                <div className="main-theme">
                    <div className="form-container">
                        <div className="icon">
                            <a href="/"><img src={recover} alt="Logo" /></a>
                            <h1>Career Finder</h1>
                            <h4>Account Recovery</h4>
                        </div>
                        <form className="general-form-area" noValidate onSubmit={this.onSubmit}>
                            <div className="single-input-form">
                                {showEmailSent === false && (
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="text"
                                    placeholder="Enter Recovery Email Address"
                                />
                                )}

                                <span className="text-danger">{errors.email}</span>

                                {showEmailSent === false && (
                                <button className="wide-button" type="Submit">Send Recovery Email</button>
                                )}

                                {showEmailNotRecognized && (
                                <span className="text-danger">{errors.emailNotFound}</span>
                                )}

                                {showEmailNotRecognized && (
                                <p>{messages.emailNotRecognized}</p>
                                )}

                                {showEmailNotRecognized && (
                                <button className="wide-button" onClick={this.goToRegister}>Register</button>
                                )}

                                {showEmailSent && (
                                <p>{messages.emailSent} to {this.state.email}</p>
                                )}

                            </div>
                        </form>
                    </div>
                </div>
                <div className="credits">
                    Photo by <a  className="credit_link" href="https://www.vecteezy.com/free-vector/captain"  target="_blank">Captain Vectors by Vecteezy</a>
                </div>
            </div>
        );
    }
}

RecoverPassword.propTypes = {
    recoverUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
	messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
	messages: state.messages
});

export default connect(
    mapStateToProps,
    { recoverUser }
)(RecoverPassword);
