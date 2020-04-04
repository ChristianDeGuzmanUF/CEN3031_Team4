import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class AdminEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clusters: null,
            filterText: "",
            selectedCluster: null
        };
        this.getClusters = this.getClusters.bind(this);
        this.updateSelectedCluster = this.updateSelectedCluster.bind(this);
    }
    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };

    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
    };

    updateSelectedCluster(id) {
        this.setState({selectedCluster: id})
    }

    render() {
        //TODO doing cluster update first, this should be similar
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="welcome-text">
                    Oops! Sorry, we're still working on this one. Come back soon!
                </div>
            </div>
        );
    };
}
AdminEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(AdminEdit)