import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ThumbnailCareers from '../../components/Body/ThumbnailCareers';
import NavBar from '../../components/Body/NavBar';
import clusterService from '../../actions/clusterService';
import userService from "../../actions/userService";
import Welcome from '../../components/Body/UserWelcome';
import AccountDetails from '../../components/Body/AccountDetails';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            clusters: null,
            filterText: "",
            user:null,
        };
        this.getClusters = this.getClusters.bind(this);
        this.getUser = this.getUser.bind(this);

    }
    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };
    getUser = async (id) => {
        let res = await userService.getOne(id);
        this.setState({user: res});
    };

    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
        if (!this.state.user || this.state.user === null) {
            this.getUser(this.props.auth.user.id);
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
                <Welcome user={this.state.user}/>
                {/*<div className="user-welcome">
                    Progress Bar
                </div>*/}
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <AccountDetails
                                    user={this.state.user}
                                    getUser={this.getUser}
                                />
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <div className="temp-todo-box2">
                            <a href="/ClusterSurvey" className="temp-link">Take the career matching survey!</a>
                        </div>
                        <div className="temp-todo-box2">
                            <div>Your top match is 'cluster'</div>
                            <div>You got this match because you're good at many things.</div>
                        </div>
                        <div>
                            <div className="temp-todo-box2">
                                <div>You have '#' points, keep it up!</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="career-cards-container">
                    <p>
                        Explore:
                    </p>
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