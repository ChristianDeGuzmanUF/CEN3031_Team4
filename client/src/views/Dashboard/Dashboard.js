import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ThumbnailCareers from '../../components/Body/ThumbnailCareers';
import NavBar from '../../components/Body/NavBar';
import clusterService from '../../actions/clusterService';
import userService from "../../actions/userService";
import Welcome from '../../components/Body/UserWelcome';
import ClusterMatches from '../../components/Body/ClusterMatches';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            clusters: null,
            filterText: "",
            user:null,
            match1: null,
            match2: null,
            match3: null,
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
    getMatch1 = async (clusterName) => {
        let res = await clusterService.getOneLongName(clusterName);
        this.setState({match1: res});
    };
    getMatch2 = async (clusterName) => {
        let res = await clusterService.getOneLongName(clusterName);
        this.setState({match2: res});
    };
    getMatch3 = async (clusterName) => {
        let res = await clusterService.getOneLongName(clusterName);
        this.setState({match3: res});
    };
    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
        if (!this.state.user || this.state.user === null) {
            this.getUser(this.props.auth.user.id).then(() => {
                if (!this.state.match1) {
                this.getMatch1(this.state.user.topMatches.one)
                }
            }).then(() => {
                if (!this.state.match2) {
                    this.getMatch2(this.state.user.topMatches.two)
                }
            }).then(() => {
                if (!this.state.match3) {
                    this.getMatch3(this.state.user.topMatches.three)
                }
            });
        }
		
		let s = document.createElement('script');
		s.type = 'text/javascript'; s.async = true; 
		s.src = 'https://widget.botcopy.com/js/injection.js'; 
		document.getElementById('botcopy-embedder-d7lcfheammjct').appendChild(s);
    };
    updateAccount = () => {
        window.location.href = "UpdateAccount";
    };
    goToSurvey = () => {
        window.location.href = "/ClusterSurvey";
    };

    render() {
        if (this.state.user && this.state.match1 && this.state.match2 && this.state.match3) {
            let message, pointMessage;

            //conditional string assignments
            if (this.state.user.topMatches.one === "") {
                message = "Take the career matching survey!";
            }
            else {
                message = "Re-take the career matching survey to reset your matches!";
            }

            /*implement this when points are in, this is just an idea, not sure how it will actually work
            if (this.state.user.points === 0) {
                pointMessage = "";
            }
            else {
                pointMessage = "You have {this.state.user.points} points, keep it up!";
            }*/

            return (
                <div className="main-theme">
                    <NavBar/>
                    <div className="welcome-row">
                        <Welcome user={this.state.user}/>
                        <button className="account-update-button" onClick={this.updateAccount}>Update Your Account Details</button>
                    </div>
                    <div>
                        {/*Add this back in when points are implemented. Needs to be conditionally assigned above.
                        <div className="options-title-xsmall">{pointMessage}</div>*/}
                        <div className="dash-pic">
                            <div className="crud-single-column-col">
                                <ClusterMatches
                                    studentMessage={this.state.studentMessage}
                                    match1={this.state.match1}
                                    match2={this.state.match2}
                                    match3={this.state.match3}/>
                                <div className="dash-item-box">
                                    <button className="large-button" onClick={this.goToSurvey}>{message}</button>
                                </div>
                            </div>
                        </div>
                        <div className="credits">
                            Photo by <a className="credit_link" href = "https://www.vecteezy.com/free-vector/captain" target="_blank">Captain Vectors by Vecteezy</a>
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
                            className="botcopy-embedder-d7lcfheammjct"
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
        else {
            return <div>One Moment Please</div>;
        }
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