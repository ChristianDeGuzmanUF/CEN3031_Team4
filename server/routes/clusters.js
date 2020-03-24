const express = require('express');
const Clusters = require('../models/ClusterSchema');

const clustersRouter = express.Router();

//clustersRouter.get("/clusters", clusters.list);

clustersRouter.get('/', async (req, res) => {
    Clusters.find({})
        .then(clusters => res.send(clusters))
        .catch(err => console.log(err));
});

clustersRouter.get('/:clusterID', async (req, res) => {
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



module.exports = clustersRouter;