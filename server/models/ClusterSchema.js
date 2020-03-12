const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
    clusterName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    occupations: [
        {
            name: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            education: {
                type: String,
            },
            averageSalary: {
                type: Number
            },
            skills: [
                {
                    type: String
                }
            ]
        }
    ]
});

module.exports = Cluster = mongoose.model('clusters', clusterSchema)