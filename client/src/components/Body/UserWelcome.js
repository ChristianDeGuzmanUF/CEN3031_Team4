import React, { Component } from 'react';

class UserWelcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.user && this.props.user !== null) {
            return (
                <div className="user-welcome">
                    Welcome {this.props.user.firstName}!
                </div>
            );
        }
        else {
            return <div>Welcome!</div>;
        }
    };
}

export default UserWelcome;