import React, { Component } from 'react';
import userService from '../../actions/userService';
import AdminList from '../../components/Body/AdminList';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import AdminDetails from "../../components/Body/AdminDetails";

class AdminEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            filterText: "",
            selectedAdminID: null,
            selectedAdmin: null
        };
        this.getUsers = this.getUsers.bind(this);        
		this.selectAdminClick = this.selectAdminClick.bind(this);	
		this.updateAdminSuccess = this.updateAdminSuccess.bind(this);	 
		this.deleteAdminSuccess = this.deleteAdminSuccess.bind(this);	
    }
    getUsers = async () => {
        let res = await userService.getAll();
        this.setState({users: res});
    };
    getOneUser = async (id) => {
        return await userService.getOne(id);
    };
    componentDidMount = async () => {
        if (!this.state.users) {
            this.getUsers();
        }
    };
	
	onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
	
	selectAdminClick(id)  {		
		this.setState({selectedAdminID: id});
        this.getOneUser(id).then(res => {this.setState({selectedAdmin: res})})
    };
	
	updateAdminSuccess()  {
		this.getUsers();
    };
	
	deleteAdminSuccess()  {
		this.getUsers();
		this.setState({selectedAdminID: null});
		this.setState({selectedAdmin: null});        
    };	

    render() {
        return (
            <div className="main-theme">
                <Navbar/>
				
                <div className="row">
                    <div className="column1">
                        <div className="crud-search">
                            <div className="crud-title">Administrators</div>
                            <input className="search-bar"
                                   placeholder="type a keyword to filter items below"
                                   onChange={this.onChange}
								   value={this.state.filterText}
								   id="filterText"              
                            />
                        </div>
                        <div className="user-cards-container">
                            <div className="with-scroll-short">
                                <AdminList
                                    users={this.state.users}
                                    filterText={this.state.filterText}
									onSelectAdminClick={this.selectAdminClick}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <AdminDetails
							users={this.state.users}
							selectedAdmin={this.state.selectedAdmin}
                            onUpdateAdminSuccess={this.updateAdminSuccess} 
							onDeleteAdminSuccess={this.deleteAdminSuccess} 
                        />
                    </div>
                </div>
            </div>
        );
    };
}
AdminEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(AdminEdit)