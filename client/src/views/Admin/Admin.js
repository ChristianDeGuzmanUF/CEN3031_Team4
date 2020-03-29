import React, { Component } from 'react';

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clusters: this.props.clusters
        };
    }

    renderCluster(cluster) {
        return (
            <li key={cluster._id} className=''>
                <h3 className="cluster__name">{cluster.shortName}</h3>
            </li>
        );
    };

    render() {
        console.log("Admin state: " + this.state.clusters);
        return (
            <div className="Admin">
                <h1>Admin Page</h1>
                <div className="list">
                    {(this.state.clusters && this.state.clusters.length > 0) ? (
                      this.state.clusters.map(cluster => this.renderCluster(cluster))
                    ) : ( 
                       <p>No clusters found</p>
                    )}
                </div>
            </div>
        );
    };
};


export default Admin;