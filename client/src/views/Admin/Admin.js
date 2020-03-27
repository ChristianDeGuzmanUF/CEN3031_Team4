import React, { useState, useEffect } from 'react';
import Search from '../../components/Search';
import clusterService from '../../actions/clusterService';
import ClusterList from '../../components/Body/ClusterList';
import ViewCluster from '../../components/Body/ViewCluster';
import './Admin.css';

const Admin = () => {

    const [filterText, setFilterText] = useState('');
    const [clusters, setClusters] = useState(null);
    const [selectedCluster, setSelectedCluster] = useState(0);

	useEffect(() => {
		if(!clusters) {
			getClusters();
		};
    });

	const getClusters = async () => {
		let res = await clusterService.getAll();
		setClusters(res);
    }

    const renderCluster = cluster => {
        return (
            <li key={cluster._id} className=''>
                <h3 className="cluster__name">{cluster.shortName}</h3>
            </li>
        );
    };

    return (
        <div className="Admin">
            <div className="row">
                <h1>Admin Console</h1>
            </div>

            <Search 
                filterText={filterText} 
                setFilterText={setFilterText} 
            />
            <main>
                <div className="row">
                    <div className="column1">
                        <div className="tableWrapper">
                            <table className="table table-striped table-hover">
                                <tr>
                                    <td>
                                        <b>Cluster Name </b>
                                    </td>
                                </tr>
                                <ClusterList
                                    clusters={clusters}
                                    filterText={filterText}
                                    selectedCluster={selectedCluster}
                                    setSelectedCluster={setSelectedCluster}
                                />
                            </table>
                        </div>
                    </div>
                    <div className="column2">
                        <ViewCluster
                            selectedCluster={selectedCluster}
                            clusters={clusters}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Admin;
