import axios from "axios";
import apiURLs, {
  signupURL,
  loginURL,
  validTokenURL,
  forgotPassword,
  resetPassword,
  contactUs,
  getUser,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  AUTH_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CONTACT_US_SUCCESS,
  CONTACT_US_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "./type";

export const signup = (registerInfo) => (dispatch) => {
  axios
    .post(apiURLs + signupURL, registerInfo)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.message.user));
      dispatch({ type: REGISTER_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL, payload: err.response.data });
    });
};
export const login = (loginInfo) => (dispatch) => {
  axios
    .post(apiURLs + loginURL, loginInfo)
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.message.user));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL, payload: err.response.data });
    });
};
export const ForgotPassword = (email) => (dispatch) => {
  axios
    .post(apiURLs + forgotPassword, { email })
    .then((response) => {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "FORGOT_PASSWORD_FAIL"
        )
      );
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: err.response.data });
    });
};
export const ResetPassword = (token, password) => (dispatch) => {
  axios
    .post(apiURLs + resetPassword, { token, password })
    .then((response) => {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "RESET_PASSWORD_FAIL"
        )
      );
      dispatch({ type: RESET_PASSWORD_FAIL, payload: err.response.data });
    });
};
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_SUCCESS });
  window.location.replace("/home");
};

export const validateToken = () => (dispatch) => {
  var token = localStorage.getItem("token");
  const options = { headers: { Authorization: "Bearer " + token } };
  axios
    .get(apiURLs + validTokenURL, options)
    .then((response) => {
      dispatch({ type: AUTH_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        dispatch(
          returnErrors(error.response.data, error.response.status, "AUTH_ERROR")
        );
        dispatch({ type: AUTH_ERROR, payload: error.response.data });
      }
    });
};
export const GetUser = () => (dispatch) => {
  var token = localStorage.getItem("token");
  const options = { headers: { Authorization: "Bearer " + token } };
  axios
    .get(apiURLs + getUser, options)
    .then((response) => {
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      if (error.response) {
        dispatch(
          returnErrors(
            error.response.data,
            error.response.status,
            "GET_USER_ERROR"
          )
        );
        dispatch({ type: GET_USER_ERROR, payload: error.response.data });
      }
    });
};

export const ContactUs = (contactInfo) => (dispatch) => {
  axios
    .post(apiURLs + contactUs, contactInfo)
    .then((response) => {
      dispatch({ type: CONTACT_US_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "CONTACT_US_ERROR")
      );
      dispatch({ type: CONTACT_US_ERROR, payload: err.response.data });
    });
};
