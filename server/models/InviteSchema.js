const mongoose = require('mongoose');

// schema for storing invite codes that will be used to gate account creation in the app
const inviteSchema = new mongoose.Schema({
    studentInviteCodes: [String],
    adminInviteCodes: [String]
});

module.exports = Invite = mongoose.model('invites', inviteSchema)