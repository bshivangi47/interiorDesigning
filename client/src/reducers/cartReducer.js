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
} from "../actions/type";

const initialState = {
  addtoCart: {
    message: "",
    success: false,
  },
  getItemFromCart: {
    message: "",
    success: false,
  },
  updateQuantity: {
    message: "",
    success: false,
  },
  cartItems: {
    message: "",
    success: false,
  },
  changePaidStatus: {
    message: "",
    success: false,
  },
  pastOrders: {
    message: "",
    success: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART_SUCCESS:
    case ADD_TO_CART_ERROR:
      return {
        ...state,
        addtoCart: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_CART_ITEM_SUCCESS:
    case GET_CART_ITEM_ERROR:
      return {
        ...state,
        getItemFromCart: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case UPDATE_QUANTITY_SUCCESS:
    case UPDATE_QUANTITY_ERROR:
      return {
        ...state,
        updateQuantity: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_CART_ITEMS_SUCCESS:
    case GET_CART_ITEMS_ERROR:
      return {
        ...state,
        cartItems: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case CHANGE_PAID_STATUS_SUCCESS:
    case CHANGE_PAID_STATUS_ERROR:
      return {
        ...state,
        changePaidStatus: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case GET_PAST_ORDERS_SUCCESS:
    case GET_PAST_ORDERS_ERROR:
      return {
        ...state,
        pastOrders: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };

    default:
      return state;
  }
}
