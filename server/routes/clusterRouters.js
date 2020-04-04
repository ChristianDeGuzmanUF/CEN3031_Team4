const express = require('express');
const Clusters = require('../models/ClusterSchema');

const clustersRouter = express.Router();

clustersRouter.get('/clusters', async (req, res) => {
    Clusters.find({})
        .then(clusters => res.send(clusters))
        .catch(err => console.log(err));
});

clustersRouter.get('/clusters/:clusterID', async (req, res) => {
    console.log(req.params.clusterID);
    Clusters.findById(req.params.clusterID)
        .then(cluster => {
            if(!cluster) {
                return res.status(404).send({
                    message: "id not found with id " + req.params.clusterID
                });
            }
        res.send(cluster);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.clusterID
                });
            }
            return res.status(500).send({
                error : "Error retrieving cluster with id " + req.params.clusterID
            });
        });
});

clustersRouter.put('/clusters/:clusterID', async (req, res) => {

    Clusters.findByIdAndUpdate(req.params.clusterID, {
        clusterName: req.body.clusterName,
        shortName: req.body.shortName,
        description: req.body.description
    }, {new: true})
        .then(cluster => {
            if(!cluster) {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.clusterID
                });
            }
            res.send(cluster);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.clusterID
                });
            }
            return res.status(500).send({
                error: "Error updating ID with id " + req.params.clusterID
            });
        });
});


clustersRouter.get('/cluster/:shortName', async (req, res) => {

    Clusters.findOne({shortName: req.params.shortName})
        .then(cluster => res.send(cluster))
        .catch(err => console.log(err));
});

clustersRouter.put('/clusterupdate/:shortName', async (req, res) => {

    Clusters.findOneAndUpdate({shortName: req.params.shortName}, {
        description: req.body.description,
    }, {new: true})
        .then(cluster => {
            if(!cluster) {
                return res.status(200).send({
                    error: "ID not found with name " + req.params.shortName
                });
            }
            res.send(cluster);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "ID not found with shortName " + req.params.shortName
                });
            }
            return res.status(500).send({
                error: "Error updating ID with shortName " + req.params.shortName
            });
        });
});

module.exports = clustersRouter;