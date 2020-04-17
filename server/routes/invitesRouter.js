const express = require('express');
const Invites = require('../models/InviteSchema');

const invitesRouter = express.Router();

invitesRouter.get('/invites', async (req, res) => {
    Invites.find({})
        .then(invites => res.send(invites))
        .catch(err => console.log(err));
});

invitesRouter.get('/invites/:adminCode', async (req, res) => {

    Invites.findOne({adminCode: req.params.adminCode})
        .then(invites => res.send(invites))
        .catch(err => console.log(err));
});

invitesRouter.put('/invites/:inviteID', async (req, res) => {
    Invites.findByIdAndUpdate(req.params.inviteID, {
        name: req.body.name,
        codes: req.body.codes,
        adminCode: req.body.adminCode,
    }, {new: true})
        .then(invite => {
            if(!invite) {
                return res.status(200).send({
                    error: "ID not found with id " + req.params.inviteID
                });
            }
            console.log(res);
            res.send(invite);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(200).send({
                error: "ID not found with id " + req.params.inviteID
            });
        }
        return res.status(500).send({
            error: "Error updating ID with id " + req.params.inviteID
        });
    });
});

module.exports = invitesRouter;
