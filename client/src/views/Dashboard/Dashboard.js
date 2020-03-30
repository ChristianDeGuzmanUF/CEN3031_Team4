import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//import data from '../../data/data';
import ThumbnailCareers from '../../components/Body/ThumbnailCareers';
import NavBar from '../../components/Body/NavBar';
import clusterService from '../../actions/clusterService';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            clusters: null,
            filterText: ""
        };
        this.getClusters = this.getClusters.bind(this);
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    }

    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
    };

    render() {
        const {user} = this.props.auth;

        return (
            <div className="main-theme">
                <NavBar/>
                <div className="career-cards-container">
                    <p>
                        Your dashboard is here.
                    </p>
                    <ThumbnailCareers clusters={this.state.clusters} />
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