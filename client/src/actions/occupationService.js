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
    }
};
