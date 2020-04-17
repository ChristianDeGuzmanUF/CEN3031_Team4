import axios from 'axios';

export default {
    updateOne: async (_id, update) => {
        console.log('put to /api/invites/' + _id);
        let res = await axios.put(`/api/invites/`+ _id, update);
        console.log(res);
        return res.data || [];
    },
    getOneAdminCode: async (_code) => {
        console.log('get to /api/invites/' + _code);
        let res = await axios.get(`/api/invites/` + _code);
        console.log(res);
        return res.data || [];
    },
};
