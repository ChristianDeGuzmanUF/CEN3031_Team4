import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import occupationService from '../../actions/occupationService';
import VisitorNavBar from  '../../components/Body/VisitorNavBar';
import NavBar from '../../components/Body/NavBar';

class OccupationInfo extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.name);
        this.state = {
            name: props.match.params.name,
            occupation: null
        };
    }
    getOccupation = async () => {
        let res = await occupationService.getOneByName(this.state.name);
        this.setState({occupation: res});
    };
    componentDidMount = async () => {
        if (!this.state.occupation) {
            this.getOccupation();
        }
    };

    render() {
        let singleCluster =	<div className="welcome-text">Oops. Nothing to see here.</div>;
        let navHeader = <VisitorNavBar/>;

        if (this.props.auth.isAuthenticated) {
            navHeader = <NavBar/>;
        }

        if (this.state.occupation != null) {
            let linkName = "/Clusters/" + this.state.occupation.cluster;
            singleCluster =
                <div className="main-theme">
                    {navHeader}
                    <div className="header-small">
                        {this.state.occupation.name}
                    </div>
                    <div className="description-box">
                        <table className="description">
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Description
                                </td>
                                <td className="description-content">
                                    {this.state.occupation.description}
                                </td>
                            </tr>
                            <tr className="spacer">&nbsp;</tr>
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Average Salary
                                </td>
                                <td className="description-content">
                                    ${this.state.occupation.averageSalary}
                                </td>
                            </tr>
                            <tr className="spacer">&nbsp;</tr>
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Career Cluster
                                </td>
                                <td className="description-content">
                                    <a href={linkName} className="info-link">{this.state.occupation.cluster}
                                    </a>
                                </td>
                            </tr>
                            <tr className="spacer">&nbsp;</tr>
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Important Courses
                                </td>
                                <td className="description-content">
                                    {this.state.occupation.courses}
                                </td>
                            </tr>
                            <tr className="spacer">&nbsp;</tr>
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Minimum Education Requirements
                                </td>
                                <td className="description-content">
                                    {this.state.occupation.education}
                                </td>
                            </tr>
                            <tr className="spacer">&nbsp;</tr>
                            <tr className="description-rows">
                                <td className="description-title-small">
                                    Link
                                </td>
                                <td className="description-content">
                                    <a href={this.state.occupation.link} className="info-link">{this.state.occupation.link}
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
        }
        return singleCluster;
    };
}

OccupationInfo.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(OccupationInfo);