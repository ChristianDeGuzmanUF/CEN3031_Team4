import React, { Component } from 'react';

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

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
                        <div className="col-md-8" key={student._id} onClick={(e) => this.clickHandler(student._id, e)}>
                            <div className="card mb-1 user-tiles">
                                <div>
                                    {student.firstName} {student.lastName}
                                </div>
                            </div>
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
