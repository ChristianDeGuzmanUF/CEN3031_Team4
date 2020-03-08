const validator = require('validator');
const isEmpty = require('is-empty');

// this function ensures all the required inputs are entered for a user that is registering
module.exports = function validateUserRegInput(input) {
    let errors = {};

    // to use Validator, empty entries have to be set to emptry strings
    input.firstName = !isEmpty(input.firstName) ? input.firstName : "";
    input.lastName = !isEmpty(input.lastName) ? input.lastName : "";
    input.userName = !isEmpty(input.userName) ? input.userName : "";
    input.email = !isEmpty(input.email) ? input.email : "";
    input.password1 = !isEmpty(input.password1) ? input.password1 : "";
    input.password2 = !isEmpty(input.password2) ? input.password2 : "";
    input.groupID = !isEmpty(input.groupID) ? input.groupID : "";


    // return error values for empty name fields
    if (validator.isEmpty(input.firstName)) {
        errors.firstName = "First name is required";
    };
    if (validator.isEmpty(input.lastName)) {
        errors.LastName = "Last name is required";
    };
    if (validator.isEmpty(input.userName)) {
        errors.userName = "Username is required";
    };

    // return error values for empty or incorrect email
    if (validator.isEmpty(input.email)) {
        errors.email = "Email address is required";
    }
    else if (!validator.isEmail(input.email)) {
        errors.email = "Email address is invalid";
    };

    // return errors values for empty groupID field
    if (validator.isEmpty(input.groupID)) {
        errors.groupID = "GroupID is required";
    };

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


