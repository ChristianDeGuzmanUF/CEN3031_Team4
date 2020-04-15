import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/occupations`);
        return res.data || [];
    },
    getOne: async (_id) => {
        console.log('get to /api/occupations/' + _id);
        let res = await axios.get(`/api/occupations/` + _id);
        console.log(res);
        return res.data || [];
    },
    updateOne: async (_id, update) => {
        console.log('get to /api/occupations/' + _id);
        let res = await axios.put(`/api/occupations/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
    getByCluster: async (cluster) => {
        let res = await axios.get(`/api/occupationsByCluster`, cluster);
        return res.data || [];
    },
    deleteOne: async (_id, update) => {
        console.log('delete to /api/occupations/' + _id);
        let res = await axios.delete(`/api/occupations/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
    createOne: async (update) => {
        console.log('post to /api/occupations/');
        let res = await axios.post(`/api/occupations/`, update);
        console.log(res);
        return res.data || [];
    },
};
