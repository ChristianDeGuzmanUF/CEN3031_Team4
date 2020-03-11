const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const validateUserRegInput = require('../controllers/registerUser');
const validateUserLoginInput = require('../controllers/login');
const User = require('../models/UserSchema');

const router = express.Router();

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
                    userName: user.userName
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