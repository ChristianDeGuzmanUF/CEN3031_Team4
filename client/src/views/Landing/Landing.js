import React, { Component } from "react";
import './Landing.css';
import ThumbnailCareers from "../../components/Body/ThumbnailCareers";
import clusterService from "../../actions/clusterService";

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            clusters: null,
            filterText: ""
        };
        this.getClusters = this.getClusters.bind(this);
    }
    goToRegister = () =>{
        window.location.href = "/Register";
    };
    goToLogin = () =>{
        window.location.href = "/Login";
    };
    getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };
    componentDidMount = async () => {
        if (!this.state.clusters) {
            this.getClusters();
        }
    };

    render() {
        return (
            <div className="main-theme">
                <header className="header">
                    <p>
                        Welcome to Career Finder
                    </p>
                </header>
                <div className="home-welcome">
                    <div className="welcome-text">
                        <p>
                            Discover career paths that match your strengths and interests. <br/><br/>Explore Career Finder to learn about the day-to-day experiences, salaries, and responsibilities in a variety of professional areas. Get started below or register to find your best matches!
                        </p>
                        <div className="nav-links">
                            <div>
                                <button className="large-button" onClick={this.goToRegister}>Register</button>
                            </div>
                            <div>
                                <button className="large-button" onClick={this.goToLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="career-cards-container">
                    <p>
                        There's a Sea of Possibilities:
                    </p>
                    <ThumbnailCareers clusters={this.state.clusters}/>
                </div>
                <div className="credits">
                    Photo by <a className="credit_link" href = "https://www.vecteezy.com/free-vector/ocean" target="_blank">Ocean Vectors by Vecteezy</a>
                </div>
            </div>
        );
    }
}
export default Landing;

