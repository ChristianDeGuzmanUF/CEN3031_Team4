const validator = require('validator');
const isEmpty = require('is-empty');

// this function validates that all the required fields for a user to login are completed
module.exports = function validateUserLoginInput(input) {
    let errors = {};

    input.userName = !isEmpty(input.userName) ? input.userName : "";
    input.password = !isEmpty(input.password) ? input.password : "";


    if (validator.isEmpty(input.userName)) {
        errors.userName = "Username is required";
    };

    if (validator.isEmpty(input.password)) {
        errors.password = "Password is required";
    };

    // return any generated errors, and a boolen if any are present
    return {
        errors, isValid: isEmpty(errors)
    };
};
