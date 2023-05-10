import axios from "axios";
import apiURLs, {
  makePayment,
  buyNow,
  affirmConfirmation,
  affirmConfirmationBuyNow,
  getTaxes,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  PAYMENT_ERROR,
  PAYMENT_SUCCESS,
  AFFIRM_PAYMENT_SUCCESS,
  AFFIRM_PAYMENT_ERROR,
  GET_TAXES_SUCCESS,
  GET_TAXES_ERROR,
} from "./type";

export const payment = (line_items, addressInfo) => (dispatch) => {
  console.log("cart action data=-=-=-=", line_items);

  axios
    .post(
      apiURLs + makePayment,
      { line_items, addressInfo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: PAYMENT_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "PAYMENT_ERROR")
      );
      dispatch({ type: PAYMENT_ERROR, payload: err.response.data });
    });
};

export const BuyNow = (line_items, itemId, addressInfo) => (dispatch) => {
  console.log("cart action data=-=-=-=", line_items);
  axios
    .post(
      apiURLs + buyNow,
      { line_items, itemId, addressInfo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: PAYMENT_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "PAYMENT_ERROR")
      );
      dispatch({ type: PAYMENT_ERROR, payload: err.response.data });
    });
};
export const AffirmConfirmation =
  (checkout_token, userId, addressInfo) => (dispatch) => {
    // console.log("cart action data=-=-=-=", line_items);
    axios
      .post(
        apiURLs + affirmConfirmation,
        { checkout_token, userId, addressInfo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "response AffirmConfirmation",
          "-=-=-=-=-=-=-=-=",
          response.data
        );
        dispatch({ type: AFFIRM_PAYMENT_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        console.log("response AffirmConfirmation", "-=-=-=-=-=-=-=-=", err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "AFFIRM_PAYMENT_ERROR"
          )
        );
        dispatch({ type: AFFIRM_PAYMENT_ERROR, payload: err.response.data });
      });
  };
export const AffirmConfirmationBuyNow =
  (checkout_token, userId, addressInfo) => (dispatch) => {
    // console.log("cart action data=-=-=-=", line_items);
    axios
      .post(
        apiURLs + affirmConfirmationBuyNow,
        { checkout_token, userId, addressInfo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(
          "response AffirmConfirmation",
          "-=-=-=-=-=-=-=-=",
          response.data
        );
        dispatch({ type: AFFIRM_PAYMENT_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        console.log("response AffirmConfirmation", "-=-=-=-=-=-=-=-=", err);
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "AFFIRM_PAYMENT_ERROR"
          )
        );
        dispatch({ type: AFFIRM_PAYMENT_ERROR, payload: err.response.data });
      });
  };

export const GetTaxes = (line_items, addressInfo) => (dispatch) => {
  // console.log("cart action data=-=-=-=", line_items);
  axios
    .post(
      apiURLs + getTaxes,
      { line_items, addressInfo },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(
        "response AffirmConfirmation",
        "-=-=-=-=-=-=-=-=",
        response.data
      );
      dispatch({ type: GET_TAXES_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      console.log("response AffirmConfirmation", "-=-=-=-=-=-=-=-=", err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "GET_TAXES_ERROR")
      );
      dispatch({ type: GET_TAXES_ERROR, payload: err.response.data });
    });
};
