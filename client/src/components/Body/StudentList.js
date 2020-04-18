import React, { Component } from 'react';

class StudentList extends Component {
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
        let studentList = null;

        if (this.props.users && this.props.users.length > 0) {
            studentList = this.props.users.map(student => {
                if (student.isAdmin === false && ((student.firstName !== null && student.firstName.toLowerCase().includes(this.props.filterText.toLowerCase()))
                    || (student.firstName !== null && student.userName.toLowerCase().includes(this.props.filterText.toLowerCase()))
                    || (student.firstName !== null && student.lastName.toLowerCase().includes(this.props.filterText.toLowerCase())))) {
                    return (
                        <div className="user-tiles" key={student._id} onClick={(e) => this.clickHandler(student._id, e)}>
                            {student.firstName} {student.lastName}
                        </div>
                    );
                }
                return null;
            });
        }
        return <div className="user-list">{studentList}</div>;
    };
}
export default StudentList;
