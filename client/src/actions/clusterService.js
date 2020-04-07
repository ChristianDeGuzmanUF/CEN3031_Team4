import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/clusters`);
        return res.data || [];
    },
    getOne: async (_id) => {
        console.log('get to /api/clusters/' + _id);
        let res = await axios.get(`/api/clusters/` + _id);
        console.log(res);
        return res.data || [];
    },
    updateOne: async (_id, update) => {
        console.log('get to /api/clusters/' + _id);
        let res = await axios.put(`/api/clusters/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
	getOneShortname: async (_id) => {
        console.log('get to /api/cluster/' + _id);
        let res = await axios.get(`/api/cluster/` + _id);
        console.log(res);
        return res.data || [];
    },
};