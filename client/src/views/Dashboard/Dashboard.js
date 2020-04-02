import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
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

    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };

    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
		
		let s = document.createElement('script');
		s.type = 'text/javascript'; s.async = true; 
		s.src = 'https://widget.botcopy.com/js/injection.js'; 
		document.getElementById('botcopy-embedder-d7lcfheammjct').appendChild(s);
    };

    render() {
        return (
            <div className="main-theme">
                <NavBar/>
                <div className="user-welcome">
                    Welcome 'first name'!
                </div>
                <div className="user-welcome">
                    Remove this ? &nbsp;
                    <a href="/ClusterSurvey" className="credit_link">Take a Survey</a>
                </div>
                <div className="user-welcome">
                    Progress Bar
                </div>
                <div className="user-welcome">
                    Make all the stuff below this look good
                </div>
                <div>
                    <div className="welcome-text">
                        <div className="h4">Your top match is blah blah blah</div>
                        <div className="h4">You got this match because you're good at stuff...like nunchuck skills, bo hunting skills, computer hacking skills. Girls only like guys who have great skills.</div>
                    </div>
                </div>
                <div>
                    <div className="welcome-text">
                        <div className="h4">You have a jillion points, keep it up!</div>
                    </div>
                </div>
                <div>
                    <div className="welcome-text">
                        <div className="h4">Account Details</div>
                        <button className="regular-button">Update Account</button>
                        <button className="regular-button">Add teacher</button>
                        <div className="h4">Clicking button takes to acct update page or list of filterable admin with add buttons next to name</div>
                    </div>
                </div>
                <div className="welcome-text">
                    <div className="h4">Get rid of the cards and show top matches or pie chart or something</div>
                </div>
                <div className="career-cards-container">
                    <ThumbnailCareers clusters={this.state.clusters} />
                </div>
				<script type="text/javascript"
					id="botcopy-embedder-d7lcfheammjct"
					class="botcopy-embedder-d7lcfheammjct" 
					data-botId="5e77c514099273f574d8d4b0">					
				</script>
				<div className="credits">
                    Chatbot icon by &nbsp;
                    <a href="https://www.flaticon.com/authors/roundicons" title="Roundicons" className="credit_link">
                        Roundicons
                    </a>
                    &nbsp; from &nbsp;
                    <a href="https://www.flaticon.com/" title="Flaticon" className="credit_link">
                    www.flaticon.com</a>
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