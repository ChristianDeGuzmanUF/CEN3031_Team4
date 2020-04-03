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
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <div className="crud-search">
                                    <div className="crud-title">Career Clusters</div>
                                    <input className="search-bar"
                                           placeholder="type a keyword to filter items below"
                                           value={this.props.input}
                                           onChange={(e) => {
                                               this.setState({filterText: e.target.value})
                                           }}
                                    />
                                </div>
                                <ClusterList
                                    clusters={this.state.clusters}
                                    filterText={this.state.filterText}
                                    updateSelectedCluster={this.updateSelectedCluster}
                                />
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewCluster
                            selectedCluster={this.state.selectedCluster}
                            clusters={this.state.clusters}
                        />
                    </div>
                </div>
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
)(ClusterEdit)