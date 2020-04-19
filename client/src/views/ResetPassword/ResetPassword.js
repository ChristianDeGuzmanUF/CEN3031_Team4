import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetPassword, logoutUser } from "../../actions/authActions";
import userService from "../../actions/userService";
import classnames from "classnames";
import reset from '../Captain.png';

class ResetPassword extends Component {
    constructor(props) {
        super(props);		
        this.state = {
			token: props.match.params.token,
			userid: null,
            password1: "",
            password2: "",
            errors: {},
			messages: {},
			user: null
        };
		
		this.getUserByToken = this.getUserByToken.bind(this);   
    }
	
	getUserByToken = async (token) => {
		if (this.props.auth.isAuthenticated) {
			this.setState({user: this.props.auth.user});	
			this.setState({userid: this.props.auth.user.id});	
		} else {
			let res = await userService.getOneByToken(token);		
			this.setState({user: res});	
			this.setState({userid: this.state.user._id});					

			if (this.state.user.resetPasswordToken == null) {			
				this.props.history.push("/pagehasexpired");
			}
		}        
    };
	
	componentDidMount = async () =>  {      
        if (!this.state.user || this.state.user === null) {
            this.getUserByToken(this.state.token);
        }		
    };

    componentWillReceiveProps(nextProps) {	
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
		
		if (nextProps.messages) {
            this.setState({
                messages: nextProps.messages
            });
			
			if(this.state.messages.logoutUser){				
				this.props.logoutUser();
			}
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
		
		// setup request variables
        const userData = {
			userid: this.state.userid,
            password1: this.state.password1,
            password2: this.state.password2,
        };
		
        this.props.resetPassword(userData, this.props.history);
    };

    render() {
        const { errors } = this.state;			
		
        return (
            <div>
                <div className="main-theme">
                    <div className="form-container">
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
                </div>
                <div className="credits">
                    Photo by <a  className="credit_link" href="https://www.vecteezy.com/free-vector/captain"  target="_blank">Captain Vectors by Vecteezy</a>
                </div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired,
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
    { resetPassword, logoutUser }
)(ResetPassword);
