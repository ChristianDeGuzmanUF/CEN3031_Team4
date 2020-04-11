const mongoose = require('mongoose');

// per user account records
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
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
        required: true,
        unique: true,
        dropDups: true
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
	resetPasswordToken: {
        type: String,
        default: ""
    },    
    resetPasswordExpires: {
        type: Date,
        default: Date.now
    },
    topMatches: {
        one: {
            type: String,
            default: ""
        },
        two: {
            type: String,
            default: ""
        },
        three: {
            type: String,
            default: ""
        }
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
        },
        manufacturing: {
            type: Boolean,
            default: false
        },
        marketing: {
            type: Boolean,
            default: false
        },
        science: {
            type: Boolean,
            default: false
        },
        logistics: {
            type: Boolean,
            default: false
        }
    }
});

module.exports = User = mongoose.model('users', userSchema);
