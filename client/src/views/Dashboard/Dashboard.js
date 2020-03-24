import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import './Dashboard.css';
import data from '../../data/data';
import ThumbnailCareers from '../../components/Body/ThumbnailCareers';

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const {user} = this.props.auth;

        return (
            <div className="Dashboard">
                <div className="Toolbar">
                    <div className="Welcome-box">
                        Welcome, {user.userName.split(" ")[0]}!
                    </div>
                    <div>
                        <input className="Search-bar" placeholder="type a keyword to search" />
                    </div>
                    <div>
                        <button className="Dashboard-button" onClick={this.onLogoutClick}>Logout</button>
                    </div>
                </div>
                <div className="Dashboard-container">
                   <div className="Career-cards-container">
                   <p>
                       Imagine the Possibilities
                   </p>
                   <div className="Career-cards-rows">
                       <div className="container">
                           <div className="card">
                               <ThumbnailCareers data={data} />
                           </div>
                       </div>
                   </div>
                </div>
               </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
