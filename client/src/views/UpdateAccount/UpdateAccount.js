import React, { Component } from 'react';
import Navbar from '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import userService from "../../actions/userService";
import AccountDetails from '../../components/Body/AccountDetails';

class UpdateAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
        this.getUser = this.getUser.bind(this);
    }
    getUser = async (id) => {
        let res = await userService.getOne(id);
        this.setState({user: res});
    };
    componentDidMount = async () => {
        if (!this.state.user || this.state.user === null) {
            this.getUser(this.props.auth.user.id);
        }
    };

    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <AccountDetails
                    user={this.state.user}
                    getUser={this.getUser}
                />
            </div>
        );
    };
}
UpdateAccount.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(UpdateAccount)
