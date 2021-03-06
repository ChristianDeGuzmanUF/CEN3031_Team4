import React, { Component } from 'react';
import userService from '../../actions/userService';
import StudentList from '../../components/Body/StudentList';
import Navbar from  '../../components/Body/NavBar';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import StudentDetails from "../../components/Body/StudentDetails";

class StudentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
            filterText: "",
            selectedStudentID: null,
            selectedStudent: null
        };
        this.getUsers = this.getUsers.bind(this);        
		this.selectStudentClick = this.selectStudentClick.bind(this);	
		this.updateStudentSuccess = this.updateStudentSuccess.bind(this);	 
		this.deleteStudentSuccess = this.deleteStudentSuccess.bind(this);	
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
	
	selectStudentClick(id)  {		
		this.setState({selectedStudentID: id});
        this.getOneUser(id).then(res => {this.setState({selectedStudent: res})})
    };
	
	updateStudentSuccess()  {
		this.getUsers();
    };
	
	deleteStudentSuccess()  {
		this.getUsers();
		this.setState({selectedStudentID: null});
		this.setState({selectedStudent: null});        
    };	
    
    render() {
        return (
            <div className="main-theme">
                <Navbar/>

                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <div className="crud-search">
                                    <div className="crud-title">Students</div>
                                    <input className="search-bar"
                                           placeholder="type a keyword to filter items below"
										   onChange={this.onChange}
                                           value={this.state.filterText}
										   id="filterText"                                          
                                    />
                                </div>
                                <table>
                                    <div className="student-cards-container">
                                        <div className="with-scroll-short">
                                            <StudentList
                                                users={this.state.users}
                                                filterText={this.state.filterText}
												onSelectStudentClick={this.selectStudentClick}
                                            />
                                        </div>
                                    </div>
                                </table>
                            </table>
                        </div>
                    </div>
                    <div className="column2 with-scroll">
                        <StudentDetails
							users={this.state.users}
							selectedStudent={this.state.selectedStudent}
                            onUpdateStudentSuccess={this.updateStudentSuccess} 
							onDeleteStudentSuccess={this.deleteStudentSuccess} 
                        />
                    </div>
                </div>
            </div>
        );
    };
}
StudentEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(StudentEdit)