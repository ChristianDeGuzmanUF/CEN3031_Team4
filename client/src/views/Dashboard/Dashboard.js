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
		
		var s = document.createElement('script'); 
		s.type = 'text/javascript'; s.async = true; 
		s.src = 'https://widget.botcopy.com/js/injection.js'; 
		document.getElementById('botcopy-embedder-d7lcfheammjct').appendChild(s);
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
					<h6><a href="/ClusterSurvey">Take a Survey</a></h6>
                    <ThumbnailCareers clusters={this.state.clusters} />
                </div>
				<script type="text/javascript"
					id="botcopy-embedder-d7lcfheammjct"
					class="botcopy-embedder-d7lcfheammjct" 
					data-botId="5e77c514099273f574d8d4b0">					
				</script>
				<div>Icons made by <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons">Roundicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
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