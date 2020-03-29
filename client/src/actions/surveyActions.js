import axios from "axios";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types";

// Submit Survey
export const submitSurvey = (surveyData, history) => dispatch => {
    axios
        .post("/survey/submit", surveyData)
        .then(res => history.push("/ClusterSurveyResult")) // re-direct to result
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: 'Error unexpected'
            })
        );
};
