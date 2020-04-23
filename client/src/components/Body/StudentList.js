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
                    let points = 0;

                    //conditional string assignments
                    if (student.topMatches.one !== "") {
                        points += 20;
                    }
                    let clusters = student.clusters;

                    Object.keys(clusters).forEach(function(key) {
                        if(clusters[key] === true){
                            // cluster visited
                            points += 5;
                        }
                    });

                    return (
                        <tr key={student._id} onClick={(e) => this.clickHandler(student._id, e)}>
                            <td>
                                <tr className="attrib-title">
                                    {student.firstName} {student.lastName}
                                </tr>
                                <tr className="attrib-title-tiny">
                                    Top Matches:
                                </tr>
                                <tr className="attrib-detail">1. {student.topMatches.one !== "" ? student.topMatches.one : 'N/A'}</tr>
                                <tr className="attrib-detail">2. {student.topMatches.two !== "" ? student.topMatches.two : 'N/A'}</tr>
                                <tr className="attrib-detail">3. {student.topMatches.three !== "" ? student.topMatches.three : 'N/A'}</tr>
                                <tr className="attrib-title-tiny">
                                    Points: {points}
                                </tr>
                            </td>
                        </tr>
                    );
                }
                return null;
            });
        }
        return <div className="user-list">{studentList}</div>;
    };
}
export default StudentList;
