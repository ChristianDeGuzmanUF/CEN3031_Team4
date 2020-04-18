import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ThumbnailCareers from '../../components/Body/ThumbnailCareers';
import NavBar from '../../components/Body/NavBar';
import clusterService from '../../actions/clusterService';
import userService from "../../actions/userService";
import Welcome from '../../components/Body/UserWelcome';

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
            let message;

            if (this.state.user.topMatches.one === "") {
                message = "Take the career matching survey!";
            }
            else {
                message = "Re-take the career matching survey to reset your matches!";
            }
            return (
                <div className="main-theme">
                    <NavBar/>
                    <div className="welcome-row">
                        <Welcome user={this.state.user}/>
                        <button className="account-update-button" onClick={this.updateAccount}>Update Your Account Details</button>
                    </div>
                    <div>
                        <div className="options-title-xsmall">You have '#' points, keep it up!</div>
                        <div className="dash-pic">
                            <div className="crud-single-column-col">
                                <div className="dash-item-box">
                                    <div className="matches1-link">Your Number One Match is: </div>
                                    <a className="matches1-link" href={"/Clusters/" + this.state.match1.shortName}>
                                            {this.state.match1.shortName}</a>
                                    <div className="matches">{this.state.match1.studentMessage}</div>
                                    <div className="matches2-link">Second and Third Matches:</div>
                                    <a className="matches-link" href={"/Clusters/" + this.state.match2.shortName}>
                                        2: {this.state.match2.shortName}</a>
                                    <a className="matches-link" href={"/Clusters/" + this.state.match3.shortName}>
                                        3: {this.state.match3.shortName}</a>
                                </div>
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