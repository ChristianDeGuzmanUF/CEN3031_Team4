import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },
    getOne: async (_id) => {
        console.log('get to /api/users/' + _id);
        let res = await axios.get(`/api/users/` + _id);
        console.log(res);
        return res.data || [];
    },
	getOneByToken: async (_token) => {
        console.log('get to /api/usersByToken/' + _token);
        let res = await axios.get(`/api/usersByToken/` + _token);
        console.log(res);
        return res.data || [];
    },
    updateOne: async (_id, update) => {
        console.log('put to /api/users/' + _id);
        let res = await axios.put(`/api/users/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
    getUserClusterViews: async (userName) => {
        console.log('get to /users/clusters/');
        let res = await axios.get(`/users/clusters`, userName);
        console.log(res);
        return res.data || [];
    },
    setUserClusterViews: async (update) => {
        console.log('post to /users/clusters');
        let res = await axios.post(`users/clusters`, update);
        console.log(res);
        return res.data || [];
    },
    deleteOne: async (_id, update) => {
        console.log('delete to /api/users/' + _id);
        let res = await axios.delete(`/api/users/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
};