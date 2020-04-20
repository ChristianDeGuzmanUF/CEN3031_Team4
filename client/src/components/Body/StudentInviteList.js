import React, { Component } from 'react';
import inviteService from "../../actions/inviteService";

class StudentInviteList extends Component {
    constructor(props) {
        super(props);
    }
    deleteOccupation = (code) => {
        let newCodeArray = this.props.studentInvites.codes.filter(thisCode => thisCode !== code);  //remove the unwanted code
        const codeData = {
            name: this.props.studentInvites.name,
            codes: newCodeArray,
            adminCode: this.props.studentInvites.adminCode,
        };
        inviteService.updateOne(this.props.studentInvites._id, codeData);
        this.props.getStudentInvites();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.studentInvites !== nextProps.studentInvites) {
            this.props.getStudentInvites();
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {
        let studentInvitesList, studentCodes = null;

        if (this.props.studentInvites) {
            studentCodes = this.props.studentInvites.codes;
            studentInvitesList = studentCodes.map(code => {
                return (
                    <div className="user-tiles">
                        <div className="right">
                            {code}
                        </div>
                        <div className="left">
                            <i className="fa 10x fa-trash" onClick={() =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteOccupation(code)}}></i>
                            <button className="clear-button" onClick={() =>{ if (window.confirm('Are you sure you wish to delete this item?')) this.deleteOccupation(code)}}>Delete</button>
                        </div>
                    </div>
                );
            });
        }
        return <div className="user-list">{studentInvitesList}</div>;
    };
}
export default StudentInviteList;