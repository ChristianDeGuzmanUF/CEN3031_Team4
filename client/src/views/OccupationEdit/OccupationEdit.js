import React, { Component } from 'react';
import occupationService from '../../actions/occupationService';
import OccupationList from '../../components/Body/OccupationList';
import ViewOccupation from '../../components/Body/ViewOccupation';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class OccupationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            occupations: null,
            filterText: "",
            selectedOccupation: null,
            selectedOccupationData: null
        };
        this.getOccupations = this.getOccupations.bind(this);
        this.updateSelectedOccupation = this.updateSelectedOccupation.bind(this);
    }
    getOccupations = async () => {
        let res = await occupationService.getAll();
        this.setState({occupations: res});
    };
    getOneOccupation = async (id) => {
        return await occupationService.getOne(id);
    };
    componentDidMount = async () => {
        if (!this.state.occupations) {
            this.getOccupations();
        }
    };
    updateSelectedOccupation(id) {
        this.setState({selectedOccupation: id});
        this.getOneOccupation(id).then(res => {this.setState({selectedOccupationData: res})})
    };
    addOccupation = () =>{
        window.location.href = "/Admin/Occupation/Add";
    };

    render() {
        return (
            <div className="main-theme">
                <Navbar/>
                <div className="welcome-row space">
                    <button className="xl-white-centered-button" onClick={this.addOccupation}>Add an Occupation</button>
                </div>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <div className="crud-search">
                                    <div className="crud-title">Occupations</div>
                                    <input className="search-bar"
                                           placeholder="type a keyword to filter items below"
                                           value={this.props.input}
                                           onChange={(e) => {
                                               this.setState({filterText: e.target.value})
                                           }}
                                    />
                                </div>
                                <table>
                                    <div className="with-scroll-short">
                                        <OccupationList
                                            occupations={this.state.occupations}
                                            filterText={this.state.filterText}
                                            selectedOccupation={this.state.selectedOccupation}
                                            getOccupations={this.getOccupations}
                                            updateSelectedOccupation={this.updateSelectedOccupation}
                                        />
                                    </div>
                                </table>
                            </table>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <ViewOccupation
                            selectedOccupation={this.state.selectedOccupation}
                            selectedOccupationData={this.state.selectedOccupationData}
                            occupations={this.state.occupations}
                            getOccupations={this.getOccupations}
                            updateSelectedOccupation={this.updateSelectedOccupation}
                        />
                    </div>
                </div>
            </div>
        );
    };
}
OccupationEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(OccupationEdit)