import React, { Component } from 'react';

class Links extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let links = null;

        if (this.props.links !== "") {
            let linkArray = this.props.links.split(',');
            links = linkArray.map(link => {
                let noWhiteSpaceLink = link.trim();
                return (
                    <div className="space-on-bottom">
                        <a href={noWhiteSpaceLink} className="info-link" target="_blank">{noWhiteSpaceLink}
                        </a>
                    </div>
                );
            });
        }
        return links;
    };
}
export default Links;
