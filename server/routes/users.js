const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validateUserRegInput = require('../controllers/registerUser');
const validateUserLoginInput = require('../controllers/login');
const User = require('../models/UserSchema');
const validator = require('validator');

const router = express.Router();

router.post("/register", (req, res) => {

    // call function to validate registration input, and store returned errors
    // isValid is a boolean to indicate whether errors are present
    const {errors, isValid} = validateUserRegInput(req.body);

    // if errors during registration, return 400 and json object of errors written
    if (!isValid) {
        return res.status(400).json(errors);
    };


    User.findOne({userName: req.body.userName}).then(user => {
            if (user) {
                return res.status(400).json({userName: "Username already exists"});
            }
            else {
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    groupID: req.body.groupID,
                    email: req.body.email,
                    password: req.body.password1
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
            return res.status(404).json({ userName: "Username not found" }); // TODO: set username and password failures to the same error returned
        };

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jwt.sign( payload, config.secretOrKey, {
                    expiresIn: 31556926 }, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ password_incorrect: "Password incorrect" });
            }
        });
    });
  });

  module.exports = router;