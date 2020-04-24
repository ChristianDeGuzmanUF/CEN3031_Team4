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
			selectedClusterID: null,
            selectedCluster: null           
        };
        this.getClusters = this.getClusters.bind(this);  
		this.selectClusterClick = this.selectClusterClick.bind(this);	
		this.updateClusterSuccess = this.updateClusterSuccess.bind(this);	
    }
    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };  
	getOneCluster = async (id) => {
        return await clusterService.getOne(id);
    };	
    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
    }; 
	
	onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
  
	selectClusterClick(id)  {		
		this.setState({selectedClusterID: id});
        this.getOneCluster(id).then(res => {this.setState({selectedCluster: res})})
    };
	
	updateClusterSuccess()  {
		this.getClusters();
    };
	
	/*
	deleteClusterClick = async (id) => {
		alert(id);
		alert('delete not working');
		return;
		// set cluster selected id
		this.setState({selectedClusterID: id})
		
		let res = await clusterService.getOne(this.state.selectedClusterID);
		// set cluster selected
        this.setState({selectedCluster: res});
    };
	
	updateClusterClick = async (updatedCluster) => {
		alert(updatedCluster);
		alert('update not working');
		return;
		// set cluster selected id
		this.setState({selectedClusterID: id})
		
		let res = await clusterService.getOne(this.state.selectedClusterID);
		// set cluster selected
        this.setState({selectedCluster: res});
    };

*/
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
										   onChange={this.onChange}
										   value={this.state.filterText}	
										   id="filterText"
                                    />
                                </div>
                                <table>
                                    <div className="with-scroll-short">
                                        <ClusterList
                                            clusters={this.state.clusters}
                                            filterText={this.state.filterText}                                          
											onSelectClusterClick={this.selectClusterClick} 
                                        />
                                    </div>
                                </table>
                            </table>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <ViewCluster
                            selectedCluster={this.state.selectedCluster}
                            onUpdateClusterSuccess={this.updateClusterSuccess}    
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