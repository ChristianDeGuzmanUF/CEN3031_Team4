const mongoose = require('mongoose');

const occupationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    courses: {
        type: String,
        default: ""
    },
    cluster: {
        type: String,
        required: true
    },
    averageSalary: {
        type: Number,
        default: 0
    },
    picture: {
        type: String,
        default: ""
    },
    link: {
            type: String
    }
});

module.exports = Occupation = mongoose.model('occupations', occupationSchema);
