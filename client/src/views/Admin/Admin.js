import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';
import ClusterList from '../../components/Body/ClusterList';
import ViewCluster from '../../components/Body/ViewCluster';
import './Admin.css';

class Admin extends Component {
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
	}

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
            <div className="Dashboard">
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
};
export default Admin;
