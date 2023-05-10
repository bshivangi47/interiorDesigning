import axios from "axios";
import apiURLs, {
  addToCart,
  getCartItems,
  getCartItem,
  updateQuantity,
  changePaidStatus,
  addToOrder,
  getPastOrders,
} from "../apiURL/apiURL";
import { returnErrors } from "./errorActions";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  GET_CART_ITEM_SUCCESS,
  GET_CART_ITEM_ERROR,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_ERROR,
  CHANGE_PAID_STATUS_SUCCESS,
  CHANGE_PAID_STATUS_ERROR,
  GET_PAST_ORDERS_SUCCESS,
  GET_PAST_ORDERS_ERROR,
} from "./type";

export const AddToCart =
  (price, MOE_ITEM, quantity = 1, projectId = null) =>
  (dispatch) => {
    console.log(
      "cart action data=-=-=-=",
      price,
      MOE_ITEM,
      quantity,
      projectId
    );

    axios
      .post(
        apiURLs + addToCart,
        { price: price, MOE_ITEM: MOE_ITEM, quantity: quantity, projectId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data,
            err.response.status,
            "ADD_TO_CART_ERROR"
          )
        );
        dispatch({ type: ADD_TO_CART_ERROR, payload: err.response.data });
      });
  };

export const GetCartItem = (MOE_ITEM) => (dispatch) => {
  axios
    .post(
      apiURLs + getCartItem,
      { MOE_ITEM: MOE_ITEM },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      // console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: GET_CART_ITEM_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_CART_ITEM_ERROR"
        )
      );
      dispatch({ type: GET_CART_ITEM_ERROR, payload: err.response.data });
    });
};

export const UpdateQuantity = (MOE_ITEM, quantity) => (dispatch) => {
  axios
    .post(
      apiURLs + updateQuantity,
      { MOE_ITEM: MOE_ITEM, quantity: quantity },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      // console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: UPDATE_QUANTITY_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "UPDATE_QUANTITY_ERROR"
        )
      );
      dispatch({ type: UPDATE_QUANTITY_ERROR, payload: err.response.data });
    });
};

export const GetPastOrders = () => (dispatch) => {
  axios
    .get(apiURLs + getPastOrders, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      // console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: GET_PAST_ORDERS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_PAST_ORDERS_ERROR"
        )
      );
      dispatch({ type: GET_PAST_ORDERS_ERROR, payload: err.response.data });
    });
};

export const GetCartItems = () => (dispatch) => {
  axios
    .get(apiURLs + getCartItems, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      // console.log("response forAddToCart", "-=-=-=-=-=-=-=-=", response.data);
      dispatch({ type: GET_CART_ITEMS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "GET_CART_ITEMS_ERROR"
        )
      );
      dispatch({ type: GET_CART_ITEMS_ERROR, payload: err.response.data });
    });
};

export const ChangePaidStatus = () => (dispatch) => {
  let user = JSON.parse(localStorage.getItem("user"));
  axios
    .post(
      apiURLs + changePaidStatus,
      { id: user._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: CHANGE_PAID_STATUS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CHANGE_PAID_STATUS_ERROR"
        )
      );
      dispatch({
        type: CHANGE_PAID_STATUS_ERROR,
        payload: err.response.data,
      });
    });
};

export const AddToOrder = (itemId, quantity) => (dispatch) => {
  let user = JSON.parse(localStorage.getItem("user"));

  axios
    .post(
      apiURLs + addToOrder,
      { itemId: itemId, quantity: quantity, id: user._id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: CHANGE_PAID_STATUS_SUCCESS, payload: response.data });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data,
          err.response.status,
          "CHANGE_PAID_STATUS_ERROR"
        )
      );
      dispatch({
        type: CHANGE_PAID_STATUS_ERROR,
        payload: err.response.data,
      });
    });
};
