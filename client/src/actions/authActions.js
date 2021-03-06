import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
	GET_MESSAGES,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/users/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Update User
export const updateUser = (userData, history) => dispatch => {
    axios
        .post("/users/update", userData)     
		.then(res => {		
			dispatch({
                type: GET_MESSAGES,              
                payload: res.data
            });			
			
			// clear messases
			dispatch({
                type: GET_ERRORS,
                //payload: err.response.data
                payload: {}
            })		
		})		
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Reset Password
export const resetPassword = (userData, history) => dispatch => {
    axios
        .post("/users/resetPassword", userData)
        .then(res => {
			dispatch({
                type: GET_MESSAGES,              
                payload: res.data
            });
			
			// clear messases
			dispatch({
                type: GET_ERRORS,
                //payload: err.response.data
                payload: {}
            })		
		})
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Recover User
export const recoverUser = (userData, history) => dispatch => {
    axios
        .post("/users/recover", userData)        
		.then(res => {           
            dispatch({
                type: GET_MESSAGES,              
                payload: res.data
            });
			
			// clear messases
			dispatch({
                type: GET_ERRORS,
                //payload: err.response.data
                payload: {}
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                //payload: err.response.data
                payload: ((err||{}).response||{}).data || 'Error unexpected'
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {	
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    //redirect to home page	
    window.location.href = "/";
};