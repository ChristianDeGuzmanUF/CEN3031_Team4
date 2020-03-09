const express = require('./config/express.js')

// seed DB with a record containing Invitation codes, used to facilitate creating a user account
// seed DB with records for career clusters
const fs = require ('fs');
const mongoose = require('mongoose');
const Invites = require('./models/InviteSchema.js');
const Clusters = require('./models/ClusterSchema.js');
const config = require('./config/config.js');

let clusterData, inviteData, db;

let clusterObject = fs.readFileSync('./server/clusters.json', 'utf8');
    try {
        clusterData = JSON.parse(clusterObject);
    }
    catch {
        console.log("cluster file not found");
        clusterData = {"data": "missing"};
    }
let inviteObject = fs.readFileSync('./server/invites.json', 'utf8');
    try {
        inviteData = JSON.parse(inviteObject);
    }
    catch {
        console.log("invite file not found");
        inviteData = {"data": "missing"};
    }
mongoose.set('bufferCommands', false);
db = mongoose.connect(process.env.DB_URI || config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

// on restart, clear the DB of Cluster and Invite records
const deleteAllClusterRecords = Clusters.deleteMany({}, function(err, clusters) {
    if (err) throw err;
});
const deleteAllInviteRecords = Invites.deleteMany({}, function(err, invites) {
    if (err) throw err;
});

// functions to load the JSON files on the server: invites.json and clusters.json into the DB
async function loadJSONCluster() {
    try {
        await Clusters.insertMany(clusterData.clusters);
        console.log('Load of clusters done!');
    } catch(e) {
        console.log(e);
    }
    const mongoClusterRecords = Clusters.find({}, function(err, clusters) {
        if (err) throw err;
        // console.log(clusters);
    })
}
async function loadJSONInvites() {
    try {
        await Invites.insertMany(inviteData.invites);
        console.log('Load of invite codes done!');
    } catch(e) {
        console.log(e);
    }
    const mongoInviteRecords = Invites.find({}, function(err, invites) {
        if (err) throw err;
        // console.log(invites);
    })
}


loadJSONCluster();
loadJSONInvites();


// Use env port or default
const port = process.env.PORT || 5000;

const app = express.init()
app.listen(port, () => console.log(`Server now running on port ${port}!`));
