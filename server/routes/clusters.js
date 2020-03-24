const express = require('express');
//const clusters = require('../controllers/clustersController.js');
const Clusters = require('../models/ClusterSchema');

const clustersRouter = express.Router();

//clustersRouter.get("/clusters", clusters.list);

clustersRouter.get("/", async (req, res) => {
    console.log("made it here");
    Clusters.find({})
        .then(clusters => res.json(clusters))
        .catch(err => console.log(err));
});

module.exports = clustersRouter;