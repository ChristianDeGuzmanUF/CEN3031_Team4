import React, { Component } from 'react';
import clusterService from '../../actions/clusterService';
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
			clusters: null,
            occupations: null,           
            filterText: "",
            selectedOccupationID: null,
            selectedOccupation: null
        };
		this.getClusters = this.getClusters.bind(this);  
        this.getOccupations = this.getOccupations.bind(this);
        this.selectOccupationClick = this.selectOccupationClick.bind(this);	
		this.updateOccupationSuccess = this.updateOccupationSuccess.bind(this);	 
		this.deleteOccupationSuccess = this.deleteOccupationSuccess.bind(this);	 		
    }
	getClusters = async () => {
        let res = await clusterService.getAll();
        this.setState({clusters: res});
    };  
    getOccupations = async () => {
        let res = await occupationService.getAll();
        this.setState({occupations: res});
    };    
    getOneOccupation = async (id) => {
        return await occupationService.getOne(id);
    };
    componentDidMount = async () => {
		if (!this.state.clusters) {
            this.getClusters();            
        }
        if (!this.state.occupations) {
            this.getOccupations();            
        }
    };
	
	onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
	
	selectOccupationClick(id)  {		
		this.setState({selectedOccupationID: id});
        this.getOneOccupation(id).then(res => {this.setState({selectedOccupation: res})})
    };
	
	updateOccupationSuccess()  {
		this.getOccupations();
    };
	
	deleteOccupationSuccess()  {
        this.getOccupations();
        this.setState({selectedOccupation: null});
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
                                           onChange={this.onChange}
                                           value={this.state.filterText}
                                           id="filterText"
                                    />
                                </div>
                                <table>
                                    <div className="with-scroll-short">
                                        <OccupationList
                                            occupations={this.state.occupations}
                                            filterText={this.state.filterText}
                                            onSelectOccupationClick={this.selectOccupationClick}
                                        />
                                    </div>
                                </table>
                            </table>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <ViewOccupation
                            clusters={this.state.clusters}
                            selectedOccupation={this.state.selectedOccupation}
                            onUpdateOccupationSuccess={this.updateOccupationSuccess}
                            onDeleteOccupationSuccess={this.deleteOccupationSuccess}
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