const express = require('express');
const Users = require('../models/UserSchema');

const usersRouter = express.Router();

usersRouter.get('/users', async (req, res) => {
    Users.find({})
        .then(users => res.send(users))
        .catch(err => console.log(err));
});

usersRouter.get('/users/:userID', async (req, res) => {
    console.log(req.params.userID);
    Users.findById(req.params.userID)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "id not found with id " + req.params.userID
                });
            }
            res.send(user);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(200).send({
                error: "ID not found with id " + req.params.userID
            });
        }
        return res.status(500).send({
            error : "Error retrieving user with id " + req.params.userID
        });
    });
});

usersRouter.put('/users/:userID', async (req, res) => {

    Users.findByIdAndUpdate(req.params.userID, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.userID
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(200).send({
                error: "ID not found with id " + req.params.userID
            });
        }
        return res.status(500).send({
            error: "Error updating ID with id " + req.params.userID
        });
    });
});

module.exports = usersRouter;