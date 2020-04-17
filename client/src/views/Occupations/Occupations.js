import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import occupationService from '../../actions/occupationService';
import VisitorNavBar from  '../../components/Body/VisitorNavBar';
import NavBar from '../../components/Body/NavBar';
import Links from '../../components/Body/Links';
import defaultPic from '../default.jpg'

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
        let singleOccupation =	<div className="welcome-text">One moment please.</div>;
        let navHeader = <VisitorNavBar/>;
        let source, credit, credit_link;

        if (this.props.auth.isAuthenticated) {
            navHeader = <NavBar/>;
        }

        if (this.state.occupation != null) {

            if (this.state.occupation.picture === "") {
                source = defaultPic;
                credit = "Poster vector created by macrovector - www.freepik.com";
                credit_link = "https://www.freepik.com/free-photos-vectors/poster";
            } else {
                source = this.state.occupation.picture;
                credit = this.state.occupation.pictureCredit;
                credit_link = this.state.occupation.pictureCreditLink;
            }

            let linkName = "/Clusters/" + this.state.occupation.cluster;
            singleOccupation =
                <div className="main-theme">
                    {navHeader}
                    <div className="header-small">
                        {this.state.occupation.name}
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
                                            Links
                                        </td>
                                        <td className="description-content">
                                            <Links links={this.state.occupation.link}/>
                                        </td>
                                    </tr>
                                </table>
                            </tr>
                        </table>
                    </div>
                </div>
        }
        return singleOccupation;
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