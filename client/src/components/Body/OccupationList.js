import React, { Component } from 'react';

class OccupationList extends Component {
    constructor(props) {
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    clickHandler(id, e) {
        e.preventDefault();
        this.props.onSelectOccupationClick(id);
    };

    render() {
        let occupationList = null;

        if (this.props.occupations && this.props.occupations.length > 0) {
            occupationList = this.props.occupations.map(occupation => {
                if(occupation.name.toLowerCase().includes(this.props.filterText.toLowerCase())
                    || occupation.description.toLowerCase().includes(this.props.filterText.toLowerCase())
                    || occupation.cluster.toLowerCase().includes(this.props.filterText.toLowerCase())
                    || occupation.courses.toLowerCase().includes(this.props.filterText.toLowerCase())) {
                    return (
                        <tr key={occupation._id} onClick={(e) => this.clickHandler(occupation._id, e)}>
                            <td>
                                <tr className="attrib-title">
                                    {occupation.name}
                                </tr>
                                <tr className="attrib-title-tiny">
                                    Cluster: {occupation.cluster}
                                </tr>
                                <tr className="attrib-detail">
                                    {occupation.description}
                                </tr>
                            </td>
                        </tr>
                    );
                }
                return null;
            });
        }

        return <div>{occupationList}</div>;
    };
}
export default OccupationList;
