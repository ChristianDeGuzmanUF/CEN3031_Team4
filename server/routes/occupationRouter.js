const express = require('express');
const Occupations = require('../models/OccupationSchema');

const occupationsRouter = express.Router();

occupationsRouter.get('/occupations', async (req, res) => {
    Occupations.find({}).sort('name')
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

occupationsRouter.get('/occupationsByCluster/:clusterName', async (req, res) => {
    Occupations.find({cluster: req.params.clusterName})
        .then(occupations => {
            if(!occupations) {
                return res.status(404).send({
                    message: "Occupation not found with cluster shortName " + req.body.cluster
                });
            }
            console.log(occupations);
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

occupationsRouter.post('/occupations', async (req, res) => {
    const newOcc = new Occupations;
    newOcc.name = req.body.name;
    console.log(req.body.name);
    newOcc.cluster = req.body.cluster;
    console.log(req.body.cluster);
    newOcc.description = req.body.description;
    console.log(req.body.description);
    newOcc.courses = req.body.courses;
    console.log(req.body.courses);
    newOcc.education = req.body.education;
    console.log(req.body.education);
    newOcc.averageSalary = req.body.averageSalary;
    console.log(req.body.averageSalary);
    newOcc.picture = req.body.picture;
    console.log(req.body.picture);
    newOcc.link = req.body.link;
    console.log(req.body.picture);
    newOcc.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err.message);
        res.status(404).send({
            message: err.message || "Some error occurred while creating the new listing."
        })
    });
});

occupationsRouter.put('/occupations/:occupationID', async (req, res) => {

    Occupations.findByIdAndUpdate(req.params.occupationID, {
        name: req.body.name,
        occupation: req.body.occupation,
        description: req.body.description,
        courses: req.body.courses,
        education: req.body.education,
        cluster: req.body.cluster,
        averageSalary: req.body.averageSalary,
        picture: req.body.picture,
        pictureCredit: req.body.pictureCredit,
        pictureCreditLink: req.body.pictureCreditLink,
        link: req.body.link,
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

occupationsRouter.delete('/occupations/:occupationID', async (req, res) => {

    Occupations.findByIdAndDelete(req.params.occupationID)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    error: "ID not found with id " + req.params.userID
                });
            }
            console.log(res);
            res.send({message: "Occupation successfully deleted."});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "NotFound") {
            return res.status(404).send({
                error: "ID not found with id " + req.params.userID
            });
        }
        return res.status(500).send({
            error: "Error deleting ID with id " + req.params.userID
        });
    });
});

occupationsRouter.get('/occupations/occupation/:name', async (req, res) => {
    console.log(req.params.name);
    Occupations.findOne({name: req.params.name})
        .then(occupation => res.send(occupation))
        .catch(err => console.log(err));
});

module.exports = occupationsRouter;
