import React, { Component } from 'react';
import inviteService from "../../actions/inviteService";

class AdminInviteList extends Component {
    constructor(props) {
        super(props);
    }
    deleteOccupation = (code) => {
        let newCodeArray = this.props.adminInvites.codes.filter(thisCode => thisCode !== code);  //remove the unwanted code
        const codeData = {
            name: this.props.adminInvites.name,
            codes: newCodeArray,
            adminCode: this.props.adminInvites.adminCode,
        };
        inviteService.updateOne(this.props.adminInvites._id, codeData);
        this.props.getAdminInvites();
    };

    render() {
        let adminInvitesList, adminCodes = null;

        if (this.props.adminInvites) {
            adminCodes = this.props.adminInvites.codes;
            adminInvitesList = adminCodes.map(code => {
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
        return <div className="user-list">{adminInvitesList}</div>;
    };
}
export default AdminInviteList;