const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
    clusterName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    occupations: [
        {
            name: {
                type: String,
                required: true
            },
            education: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = Cluster = mongoose.model('clusters', clusterSchema)