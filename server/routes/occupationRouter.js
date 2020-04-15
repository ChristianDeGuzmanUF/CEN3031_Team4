const express = require('express');
const Occupations = require('../models/OccupationSchema');

const occupationsRouter = express.Router();

occupationsRouter.get('/occupations', async (req, res) => {
    Occupations.find({})
        .then(occupations => res.send(occupations))
        .catch(err => console.log(err));
});

occupationsRouter.get('/occupations/:occupationID', async (req, res) => {
    console.log(req.params.occupationID);
    Occupations.findById(req.params.occupationID)
        .then(occupation => {
            if(!occupation) {
                return res.status(404).send({
                    message: "id not found with id " + req.params.occupationID
                });
            }
        res.send(occupation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.occupationID
                });
            }
            return res.status(500).send({
                error : "Error retrieving occupation with id " + req.params.occupationID
            });
        });
});

occupationsRouter.get('/occupationsByCluster', async (req, res) => {
    Occupations.find({cluster: req.body.cluster})
        .then(occupations => {
            if(!occupations) {
                return res.status(404).send({
                    message: "Occupation not found with cluster shortName " + req.body.cluster
                });
            }
        res.send(occupations);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "Occupations not found with cluster shortName " + req.body.cluster
                });
            }
            return res.status(500).send({
                error : "Error retrieving occupation with cluster shortName " + req.body.cluster
            });
        });
});

occupationsRouter.put('/occupations/:occupationID', async (req, res) => {

    Occupations.findByIdAndUpdate(req.params.occupationID, {
        name: req.body.name,
        occupation: req.body.occupation,
        description: req.body.description,
        averageSalary: req.body.averageSalary,
        description: req.body.description,
        picture: req.body.picture
    }, {new: true})
        .then(occupation => {
            if(!occupation) {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.occupationID
                });
            }
            res.send(occupation);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.occupationID
                });
            }
            return res.status(500).send({
                error: "Error updating ID with id " + req.params.occupationID
            });
        });
});


occupationsRouter.get('/occupation/:name', async (req, res) => {

    Occupations.findOne({name: req.params.name})
        .then(occupation => res.send(occupation))
        .catch(err => console.log(err));
});

module.exports = occupationsRouter;
