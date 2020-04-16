import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import clusterService from '../../actions/clusterService';
import occupationService from '../../actions/occupationService';
import VisitorNavBar from  '../../components/Body/VisitorNavBar';
import NavBar from '../../components/Body/NavBar';
import ThumbnailOccupations from "../../components/Body/ThumbnailOccupations";
import defaultPic from '../default.jpg'

class ClusterInfo extends Component {
    constructor(props) {
        super(props);
		console.log(props.match.params.shortname);
        this.state = {
			shortname: props.match.params.shortname,
            cluster: null,
            occupations: null
        };
        this.getCluster = this.getCluster.bind(this);
        this.getOccupations = this.getOccupations.bind(this);
    }
	
    getCluster = async () => {
        let res = await clusterService.getOneShortname(this.state.shortname);
        this.setState({cluster: res});
    };

    getOccupations = async () => {
        let res = await occupationService.getByCluster(this.state.shortname);
        this.setState({occupations: res});
    };
    componentDidMount = async () => {
        if (!this.state.cluster) {
            this.getCluster();
        }
        if (!this.state.occupations) {
            this.getOccupations();
        }
    };
   
    render() {
		let singleCluster =	<div className="welcome-text">One moment please.</div>;
		let navHeader = <VisitorNavBar/>;
		let source, credit, credit_link;
		
		if (this.props.auth.isAuthenticated) {
			navHeader = <NavBar/>;
		}

        if (this.state.cluster != null) {

		    if (this.state.cluster.picture === "") {
                source = defaultPic;
                credit = "Poster vector created by macrovector - www.freepik.com";
                credit_link = "https://www.freepik.com/free-photos-vectors/poster";
            } else {
                source = this.state.cluster.picture;
                credit = this.state.cluster.pictureCredit;
                credit_link = this.state.cluster.pictureCreditLink;
            }

            singleCluster =
				 <div className="main-theme">
					{navHeader}
					<div className="header">
                        {this.state.cluster.shortName}
                    </div>
                     <div className="description-box">
                         <table className='description-outer'>
                             <tr className="picture">
                                 <img src={source}/>
                                 <div className="credits_small">
                                     <a className="credit_link_blue" href = {credit_link} target="_blank">{credit}</a>
                                 </div>
                             </tr>
                             <tr>
                                 <table className="description">
                                     <tr className="description-rows">
                                         <td className="description-title">
                                             Full Name
                                         </td>
                                         <td className="description-content">
                                             {this.state.cluster.clusterName}
                                         </td>
                                     </tr>
                                     <tr className="spacer">&nbsp;</tr>
                                     <tr className="description-rows">
                                         <td className="description-title-small">
                                             Salary Range
                                         </td>
                                         <td className="description-content">
                                             {this.state.cluster.salaryRange}
                                         </td>
                                     </tr>
                                     <tr className="spacer">&nbsp;</tr>
                                     <tr className="description-rows">
                                         <td className="description-title">
                                             Description
                                         </td>
                                         <td className="description-content">
                                             {this.state.cluster.description}
                                         </td>
                                     </tr>
                                     <tr className="spacer">&nbsp;</tr>
                                     <tr className="description-rows">
                                         <td className="description-title">
                                             Skills
                                         </td>
                                         <td className="description-content">
                                             {this.state.cluster.skills}
                                         </td>
                                     </tr>
                                 </table>
                             </tr>
                         </table>
                     </div>
                     <div className="career-cards-container">
                         <p>
                             Occupations Related to {this.state.shortname}
                         </p>
                         <ThumbnailOccupations occupations={this.state.occupations}/>
                     </div>
                 </div>
        }
        return singleCluster;
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