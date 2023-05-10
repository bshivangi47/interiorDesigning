import axios from "axios";
import apiURLs, { sendBusinessEmail } from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import { BUSINESS_EMAIL_SUCCESS, BUSINESS_EMAIL_ERROR } from "./type";

export const SendBusinessEmail = (action) => (dispatch) => {
  axios
    .post(
      apiURLs + sendBusinessEmail,
      { action },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: BUSINESS_EMAIL_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "BUSINESS_EMAIL_ERROR"
        )
      );
      dispatch({
        type: BUSINESS_EMAIL_ERROR,
        payload: err.response.data,
      });
    });
};
