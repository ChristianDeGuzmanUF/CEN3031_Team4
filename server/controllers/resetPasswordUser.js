const validator = require('validator');
const isEmpty = require('is-empty');
const Invite = require('../models/InviteSchema');


// this function ensures all the required inputs are entered for a user that is registering
module.exports = async function validateUserResetPasswordInput(input) {
    let errors = {};
    
    // to use Validator, empty entries have to be set to emptry strings   
    input.password1 = !isEmpty(input.password1) ? input.password1 : "";
    input.password2 = !isEmpty(input.password2) ? input.password2 : "";
    
    // return error for mismatched or empty passwords
    if (validator.isEmpty(input.password1)) {
        errors.password1 = "Password is required";
    };
    if (validator.isEmpty(input.password2)) {
        errors.password2 = "Password confirmation is required";
    };

    if (!validator.isLength(input.password1, { min: 6, max: 16 })) {
        errors.password1 = "Password must be 6 - 16 characters in length";
    };

    if (!validator.equals(input.password1, input.password2)) {
        errors.password2 = "Passwords do not match";
    };
    
    // return the array of errors, and boolean value representing presence of errors
    return {
        errors, isValid: isEmpty(errors)
    };
};
