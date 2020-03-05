const mongoose = require('mongoose');

// single record to store all invite codes that will be used to gate account creation in the app
const InviteSchema = new mongoose.Schema({
    studentInviteCodes: [String],
    adminInviteCodes: [String]
});

module.exports = Codes = mongoose.model('codes', InviteSchema)