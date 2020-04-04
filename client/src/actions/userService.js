import axios from 'axios';

export default {
    getAll: async () => {
        let res = await axios.get(`/api/users`);
        return res.data || [];
    },
    getOne: async (_id) => {
        console.log('get to ' +`/api/users/` + _id);
        let res = await axios.get(`/api/users/` + _id);
        console.log(res);
        return res.data || [];
    },
    updateOne: async (_id, update) => {
        console.log('get to ' + `/api/users/` + _id);
        let res = await axios.put(`/api/users/`+ _id, update);
        console.log(res);
        return res.data || [];
    }
};