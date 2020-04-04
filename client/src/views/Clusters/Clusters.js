import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import clusterService from '../../actions/clusterService';
import VisitorNavBar from  '../../components/Body/VisitorNavBar';
import NavBar from '../../components/Body/NavBar';
import './Clusters.css';

class ClusterInfo extends Component {
    constructor(props) {
        super(props);
		console.log(props.match.params.shortname);
        this.state = {
			shortname: props.match.params.shortname,
            cluster: null          
        };
        this.getCluster = this.getCluster.bind(this);       
    }
	
    getCluster = async () => {
        let res = await clusterService.getOneShortname(this.state.shortname);
        this.setState({cluster: res});
    };

    componentDidMount = async () => {
        if (!this.state.cluster) {
            this.getCluster();
        }
    };
   
    render() {
		let singleCluster = null;
		singleCluster =	<div className="welcome-text">Oops. Nothing to see here.</div>;
		
		let navHeader = null;
		navHeader = <VisitorNavBar/>;
		
		if (this.props.auth.isAuthenticated) {
			navHeader = <NavBar/>;
		}
					
        if (this.state.cluster != null) {
            singleCluster = 
				 <div className="main-theme">
					{navHeader}
					<div className="welcome-text">
						<table>
							<tr className="attrib-title">
							{this.state.cluster.shortName}
							</tr>
							<tr className="attrib-detail">
							{this.state.cluster.description}
							</tr>
						</table>
					</div>
				</div>
        }
        
        return <div className="row">{singleCluster}</div>;	
    };
}

ClusterInfo.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ClusterInfo);