const express = require('express');
const Users = require('../models/UserSchema');

const usersRouter = express.Router();

usersRouter.get('/users', async (req, res) => {
    Users.find({})
        .then(users => res.send(users)) //TODO: This should NOT send back the passwords
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
            res.send(user); //TODO: this should NOT send back the password
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

usersRouter.get('/usersByToken/:token', async (req, res) => {
    console.log(req.params.token);
	Users.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})    
        .then(user => {
            if(!user) {				
				// return empty user
                return res.status(200).send({});
            }			
			
			// check password token expiration
			
			if(!user) {				
				// return empty user
                return res.status(200).send({});
            }	
			
            res.send(user); //TODO: this should NOT send back the password
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(200).send({
                error: "Token not found with token " + req.params.token
            });
        }
        return res.status(500).send({
            error : "Error retrieving user with token " + req.params.token
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
            console.log(res);
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

usersRouter.delete('/users/:userID', async (req, res) => {

    Users.findByIdAndDelete(req.params.userID)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    error: "ID not found with id " + req.params.userID
                });
            }
            console.log(res);
            res.send({message: "User successfully deleted."});
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

module.exports = usersRouter;