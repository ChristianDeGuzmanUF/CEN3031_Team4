import React, { Component } from 'react';


class ClusterMatches extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        if (this.props.match1.shortName && this.props.match2.shortName && this.props.match3.shortName) {
            return (
                <div className="dash-item-box">
                    <div className="matches1-link">Your Career Cluster Matches</div>
                    <div className="matches">Click on the names below to explore your top matches.</div>
                    <a className="matches1-link" href={"/Clusters/" + this.props.match1.shortName}>
                        1. {this.props.match1.shortName}</a>
                    <div className="matches">{this.props.studentMessage}</div>
                    <a className="matches-link" href={"/Clusters/" + this.props.match2.shortName}>
                        2: {this.props.match2.shortName}</a>
                    <a className="matches-link" href={"/Clusters/" + this.props.match3.shortName}>
                        3: {this.props.match3.shortName}</a>
                </div>
            );
        }
        else {
            return(
                <div className="dash-item-box">
                    <div className="matches1-link">Take the survey below to discover your top career cluster matches!</div>
                </div>
            );
        }
    };
}

export default ClusterMatches;