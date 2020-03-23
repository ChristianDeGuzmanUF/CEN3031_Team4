const mongoose = require('mongoose');

// per user account records
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    teacherUserName: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    clusters: {
        agriculture: {
            type: Boolean,
            default: false
        },
        architecture: {
            type: Boolean,
            default: false
        },
        arts: {
            type: Boolean,
            default: false
        },
        business: {
            type: Boolean,
            default: false
        },
        education: {
            type: Boolean,
            default: false
        },
        finance: {
            type: Boolean,
            default: false
        },
        government: {
            type: Boolean,
            default: false
        },
        health: {
            type: Boolean,
            default: false
        },
        hospitality: {
            type: Boolean,
            default: false
        },
        human: {
            type: Boolean,
            default: false
        },
        infotech: {
            type: Boolean,
            default: false
        },
        law: {
            type: Boolean,
            default: false
        }
    }
});

module.exports = User = mongoose.model('users', userSchema);
