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
    // Form validation
  const { errors, isValid } = validateUserLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const userName = req.body.userName;
    const password = req.body.password;
  // Find user 
    User.findOne({ userName: req.body.userName }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ userName: "Username not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            config.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;