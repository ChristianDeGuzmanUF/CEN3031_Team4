import React, { Component } from 'react';

class AdminList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.users !== nextProps.users) {
            this.props.getUsers();
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

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
                        <div className="user-tiles" key={admin._id} onClick={(e) => this.clickHandler(admin._id, e)}>
                            {admin.firstName} {admin.lastName}
                        </div>
                    );
                }
                return null;
            });
        }
        return <div className="user-list">{adminList}</div>;
    };
}
export default AdminList;