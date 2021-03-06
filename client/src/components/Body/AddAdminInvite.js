import React, { Component } from 'react';
import inviteService from "../../actions/inviteService";

class AddAdminInvite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholder: "" //forces input back to blank on re-render
        }
    }
	
    addInvite = () => {
        if (this.state.placeholder === "") {
            alert("Cannot add an empty code.");
        }
        if (this.props.adminInvites.codes.includes(this.state.placeholder)) {
            alert("Code already added.");
        }
        else if (this.state.placeholder !== "" && !this.props.adminInvites.codes.includes(this.state.placeholder)) {
            let newCodeArray = this.props.adminInvites.codes;
            console.log('code to add' + this.state.placeholder);
            newCodeArray.push(this.state.placeholder);
            const codeData = {
                name: this.props.adminInvites.name,
                codes: newCodeArray,
                adminCode: this.props.adminInvites.adminCode,
            };
            document.getElementById('codeToAddAdmin').value = "";
            inviteService.updateOne(this.props.adminInvites._id, codeData);
            this.props.onAddAdminInviteSuccess();
        }
    };

    onChange = e => {
        e.preventDefault();
        this.setState({placeholder: e.target.value });
    };

    render() {
        return (
            <div className="description-box">
                <div className="crud-title-xsmall">
                    Add a New Admin Invite Code
                </div>
                <div>
                    <div className="user-tiles">
                        <div className="right">
                            <input
                                onChange={this.onChange}
                                id="codeToAddAdmin"
                                type="text"
                            />
                        </div>
                        <div className="left">
                            <button className="clear-button" onClick={this.addInvite}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
export default AddAdminInvite;