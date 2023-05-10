import axios from "axios";
import apiURLs, {
  getProducts,
  getProduct,
  searchProducts,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_ERROR,
} from "./type";

export const GetProducts = (category, page) => (dispatch) => {
  axios
    .post(
      apiURLs + getProducts + `?page=${page}`,
      { category },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      // console.log(
      //   "response for getProducts with category",
      //   category,
      //   "-=-=-=-=-=-=-=-=",
      //   response.data
      // );
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      console.log("err=-=-=-=", err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PRODUCTS_ERROR"
        )
      );
      dispatch({ type: GET_PRODUCTS_ERROR, payload: err.response.data });
    });
};
export const GetProduct = (itemId) => (dispatch) => {
  axios
    .post(
      apiURLs + getProduct,
      { itemId: itemId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      console.log(
        "response for getProduct with category",
        // category,
        "-=-=-=-=-=-=-=-=",
        response.data
      );
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PRODUCT_ERROR"
        )
      );
      dispatch({ type: GET_PRODUCT_ERROR, payload: err.response.data });
    });
};
export const SearchProducts = (category, page, searchTerm) => (dispatch) => {
  console.log("searchTerm-=-=-=", searchTerm);
  axios
    .post(
      apiURLs + searchProducts + `?page=${page}`,
      { category, searchTerm },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      // console.log(
      //   "response for getProducts with category",
      //   category,
      //   "-=-=-=-=-=-=-=-=",
      //   response.data
      // );
      dispatch({ type: SEARCH_PRODUCTS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      console.log("err=-=-=-=", err);
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "SEARCH_PRODUCTS_ERROR"
        )
      );
      dispatch({ type: SEARCH_PRODUCTS_ERROR, payload: err.response.data });
    });
};
