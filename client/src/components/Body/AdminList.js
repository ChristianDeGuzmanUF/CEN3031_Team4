import React, { Component } from 'react';

class AdminList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(id, e) {
        e.preventDefault();
        this.props.updateSelectedUser(id);
    };

    render() {
        let adminList = null;

        if (this.props.users && this.props.users.length > 0) {
            adminList = this.props.users.map(admin => {
                if(admin.isAdmin === true &&
                    ((admin.firstName !== null && admin.firstName.toLowerCase().includes(this.props.filterText.toLowerCase()))
                    || (admin.firstName !== null && admin.userName.toLowerCase().includes(this.props.filterText.toLowerCase()))
                    || (admin.firstName !== null && admin.lastName.toLowerCase().includes(this.props.filterText.toLowerCase())))) {
                    return (
                        <tr key={admin._id} onClick={(e) => this.clickHandler(admin._id, e)}>
                            <td className="user-title">
                                <tr className="user-titles">
                                    {admin.firstName} {admin.lastName}
                                </tr>
                            </td>
                        </tr>
                    );
                }
                return null;
            });
        }
        return <div className="user-list">{adminList}</div>;
    };
}
export default AdminList;
