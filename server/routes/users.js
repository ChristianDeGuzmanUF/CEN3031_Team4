const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validateUserRegInput = require('../controllers/registerUser');
const validateUserLoginInput = require('../controllers/login');
const User = require('../models/UserSchema');

const router = express.Router();

router.get("/matches", async (req, res) => {
    const userName = req.body.userName;

    User.findOne({ userName: req.body.userName }).then(user => {
        if (!user) {
            return res.status(200).json({ userNameNotFound: "Username not found" });
        }
        res.status(200).json({
            one: user.topMatches.one,
            two: user.topMatches.two,
            three: user.topMatches.three
        });
        }).catch(err => {
            return res.status(500).send({
                error: "Error retrieving top matches for user " + req.body.userName
            });
        });
});

router.post("/matches", (req, res) => {
    const one = req.body.one;
    const two = req.body.two;
    const three = req.body.three;
    User.findOneAndUpdate({ userName: req.body.userName }, 
        {
            topMatches: { one: req.body.one,
                          two: req.body.two,
                          three: req.body.three
        }},
        {new: true}
    ).then(user => {
        if (!user) {
            return res.status(404).json({ userNameNotFound: "Username not found" });
        }
        res.status(200).json({
            one: user.topMatches.one,
            two: user.topMatches.two,
            three: user.topMatches.three
        });
    }).catch(err => {
        return res.status(500).send({
            error: "Error updating top matches for user " + req.body.userName
        });
    });
});

router.get("/clusters", async (req, res) => {
    const userName = req.body.userName;

    User.findOne({ userName: req.body.userName }).then(user => {
        if (!user) {
            return res.status(200).json({ userNameNotFound: "Username not found" });
        }
        res.status(200).json({
            agriculture: user.clusters.agriculture,
            architecture: user.clusters.architecture,
            arts: user.clusters.arts,
            business: user.clusters.business,
            education: user.clusters.education,
            finance: user.clusters.finance,
            government: user.clusters.government,
            health: user.clusters.health,
            hospitality: user.clusters.hospitality,
            human: user.clusters.human,
            infotech: user.clusters.infotech,
            law: user.clusters.law,
            manufacturing: user.clusters.manufacturing,
            marketing: user.clusters.marketing,
            science: user.clusters.science,
            logistics: user.clusters.logistics
        });
        }).catch(err => {
            return res.status(500).send({
                error: "Error retrieving top matches for user " + req.body.userName
            });
        });
});

router.post("/clusters", (req, res) => {
    User.findOneAndUpdate({ userName: req.body.userName }, 
        {
            clusters: { 
                agriculture: req.body.agriculture,
                architecture: req.body.architecture,
                arts: req.body.arts,
                business: req.body.business,
                education: req.body.education,
                finance: req.body.finance,
                government: req.body.government,
                health: req.body.health,
                hospitality: req.body.hospitality,
                human: req.body.human,
                infotech: req.body.infotech,
                law: req.body.law,
                manufacturing: req.body.manufacturing,
                marketing: req.body.marketing,
                science: req.body.science,
                logistics: req.body.logistics
        }},
        {new: true}
    ).then(user => {
        if (!user) {
            return res.status(404).json({ userNameNotFound: "Username not found" });
        }
        res.status(200).json({
            agriculture: user.clusters.agriculture,
            architecture: user.clusters.architecture,
            arts: user.clusters.arts,
            business: user.clusters.business,
            education: user.clusters.education,
            finance: user.clusters.finance,
            government: user.clusters.government,
            health: user.clusters.health,
            hospitality: user.clusters.hospitality,
            human: user.clusters.human,
            infotech: user.clusters.infotech,
            law: user.clusters.law,
            manufacturing: user.clusters.manufacturing,
            marketing: user.clusters.marketing,
            science: user.clusters.science,
            logistics: user.clusters.logistics
        });
    }).catch(err => {
        return res.status(500).send({
            error: "Error updating top matches for user " + req.body.userName
        });
    });
});

router.post("/register", async (req, res) => {

    // call function to validate registration input, and store returned errors
    // isValid is a boolean to indicate whether errors are present
    const {errors, isValid, isAdminUser} = await validateUserRegInput(req.body);

    // if errors during registration, return 400 and json object of errors written
    if (!isValid) {
        return res.status(400).json(errors);
    };

    User.findOne({userName: req.body.userName}).then(user => {
        if (user) {
            return res.status(400).json({userName: "Username already exists"});
        }
        else {
            // console.log("Is this an admin user? " + isAdminUser);
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password1,
                isAdmin: isAdminUser
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                      .save()
                      .then(user => res.json(user))
                      .catch(err => console.log(err));
                });
            });
        };
    });
});

router.post("/login", (req, res) => {

    // call function to validate the user-provided values, and store returned 
    // errors. isValid is a boolean to indicate whether errors are present
    const { errors, isValid } = validateUserLoginInput(req.body);

    // return erorrs if validation fails empty string checks
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    // locate user in DB if present. return error if not found. hash password provided, and check against
    // hashed password in DB. finally, return login token if a match, otherwise return a mismatch error.
    const userName = req.body.userName;
    const password = req.body.password;
    User.findOne({ userName: req.body.userName }).then(user => {
        if (!user) {
            return res.status(404).json({ userNameNotFound: "Username not found" });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    userName: user.userName,
                    admin: user.isAdmin
                };
                jwt.sign(
                    payload,
                    process.env.SECRETORKEY || config.secretOrKey, { expiresIn: 31556926 }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
              return res
                .status(400)
                .json({ passwordIncorrect: "Password incorrect" });
            }
        });
    });
});

module.exports = router;