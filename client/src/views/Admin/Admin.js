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

	const getClusters = async () => {
		let res = await clusterService.getAll();
		setClusters(res);
    }

	useEffect(() => {
		if(!clusters) {
			getClusters();
        };
    });


    /*
    const renderCluster = cluster => {
        return (
            <li key={cluster._id} className=''>
                <h3 className="cluster__name">{cluster.shortName}</h3>
            </li>
        );
    };
    */

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
                                <tr>
                                    <td>
                                        <b>Career Name </b>
                                    </td>
                                    <td>
                                        <b>Description </b>
                                    </td>
                                </tr>
                                <ClusterList
                                    clusters={clusters}
                                    filterText={filterText}
                                    selectedCluster={selectedCluster}
                                    setSelectedCluster={setSelectedCluster}
                                />
                    <div className="column2">
                        <ViewCluster
                            selectedCluster={selectedCluster}
                            clusters={clusters}
                        />
                    </div>
            </main>
        </div>
    );
};

export default Admin;
