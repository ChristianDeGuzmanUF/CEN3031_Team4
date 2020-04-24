const validator = require('validator');
const isEmpty = require('is-empty');
const Users = require('../models/UserSchema');


// this function ensures all the required inputs are entered for a user that is registering
module.exports = async function validateUserUpdate(input, userID) {
    let errors = {};

    // to use Validator, empty entries have to be set to emptry strings
    input.firstName = !isEmpty(input.firstName) ? input.firstName : "";
    input.lastName = !isEmpty(input.lastName) ? input.lastName : "";
    input.userName = !isEmpty(input.userName) ? input.userName : "";
    input.email = !isEmpty(input.email) ? input.email : "";
    

    // return error values for empty name fields
    if (validator.isEmpty(input.firstName)) {
        errors.firstName = "First name is required";
    };
    if (validator.isEmpty(input.lastName)) {
        errors.lastName = "Last name is required";
    };
    if (validator.isEmpty(input.userName)) {
        errors.userName = "Username is required";
    } else {
        await Users.find({userName: input.userName}).then(user => {
            if (user.length && !user[0].equals(userID)) {
                errors.userName = "Username already registered";
            }
        });
    };

    if (validator.isEmpty(input.email)) {
        errors.email = "Email is required";
    } else if (!validator.isEmail(input.email)) {
        errors.email = "Email address is invalid";
    } else {
        await Users.find({email: input.email}).then(user => {
            if (user.length && !user[0].equals(userID)) {
                errors.email = "Email address already registered";
            }
        });
    };

    // return the array of errors, and boolean value representing presence of errors
    return {
        errors, isValid: isEmpty(errors)
    };
};
