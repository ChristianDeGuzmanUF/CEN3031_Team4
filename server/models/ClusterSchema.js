const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
	clusterid: {
		type: String,
		default: ""
	},
    clusterName: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    studentMessage: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: ""
    },
    pictureCredit: {
        type: String,
        default: ""
    },
    pictureCreditLink: {
        type: String,
        default: ""
    },
    skills: {
        type: String
    },
    salaryRange: {
        type: String
    }
});

module.exports = Cluster = mongoose.model('clusters', clusterSchema);