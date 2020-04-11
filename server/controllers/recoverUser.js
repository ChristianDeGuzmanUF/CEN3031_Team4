const validator = require('validator');
const isEmpty = require('is-empty');
const Invite = require('../models/InviteSchema');


// this function ensures all the required inputs are entered for a user that is registering
module.exports = async function validateUserRecoverInput(input) {
    let errors = {};    

    // to use Validator, empty entries have to be set to emptry strings
    input.email = !isEmpty(input.email) ? input.email : "";
   
    // return error values for empty or incorrect email
    if (validator.isEmpty(input.email)) {
        errors.email = "Email address is required";
    }
    else if (!validator.isEmail(input.email)) {
        errors.email = "Email address is invalid";   
	};

    // return the array of errors, and boolean value representing presence of errors
    return {
        errors, isValid: isEmpty(errors)
    };
};
