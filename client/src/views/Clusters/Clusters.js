import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';
import VisitorNavBar from  '../../components/Body/VisitorNavBar';

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
					
        if (this.state.cluster != null) {
            singleCluster = 
				 <div className="main-theme">
					<VisitorNavBar/>
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

export default ClusterInfo;