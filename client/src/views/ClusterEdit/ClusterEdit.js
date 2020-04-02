import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';
import ClusterList from '../../components/Body/ClusterList';
import ViewCluster from '../../components/Body/ViewCluster';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class ClusterEdit extends Component {
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

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };

    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
    };

    goToClusterEdit = () =>{
        window.location.href = "/Admin/Cluster";
    };

    updateSelectedCluster(id) {
        this.setState({selectedCluster: id})
    }

    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <div>
                    <div className="welcome-text">
                        <div className="h4">Account Details</div>
                        <div className="h4">Users Account Details here (compact)</div>
                        <button className="regular-button">Update Account</button>
                    </div>
                </div>
                <div className="welcome-text">
                    <div className="h4">Admin Control Options</div>
                    <div> Make less ugly, group into columns</div>
                    <button className="regular-button">Get A Student Invite Code</button>
                    <button className="regular-button">Get An Administrator Invite Code</button>
                    <div> Invites trigger creation of a code + storage in db + pop up that shows code #TODO need popups</div>
                    <button className="regular-button">Add, Edit, or Delete Students</button>
                    <button className="regular-button">Add or Delete Administrators</button>
                    <button className="regular-button" onClick={this.goToClusterEdit}>Add, Edit, or Delete Career Clusters</button>
                    <div>These crud buttons just take to page based on bootcamp 4, list on side, filter at top, click shows detail</div>
                    <div>These crud buttons just take to page based on bootcamp 4, list on side, filter at top, click shows detail w/ button to edit add or delete</div>
                </div>
                <div className="Toolbar">
                    <div className="Welcome-box">
                    </div>
                    <div>
                        <input className="Search-bar"
                               placeholder="type a keyword to search"
                               value={this.props.input}
                               onChange={(e) => {
                                   this.setState({filterText: e.target.value})
                               }}
                        />
                    </div>
                    <div>
                        <button className="Dashboard-button" onClick={this.onLogoutClick}>Logout</button>
                    </div>
                </div>

                <main>
                    <tr>
                        <td>
                            <b>Career Name </b>
                        </td>
                        <td>
                            <b>Description </b>
                        </td>
                    </tr>
                    <ClusterList
                        clusters={this.state.clusters}
                        filterText={this.state.filterText}
                        updateSelectedCluster={this.updateSelectedCluster}
                    />
                    <div className="column2">
                        <ViewCluster
                            selectedCluster={this.state.selectedCluster}
                            clusters={this.state.clusters}
                        />
                    </div>
                </main>
            </div>
        );
    };
}
ClusterEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(ClusterList)
