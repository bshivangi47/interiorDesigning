import {
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
  SEARCH_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS_ERROR,
} from "../actions/type";

const initialState = {
  allProducts: { message: [], totalDocs: 0, success: false },
  getProduct: {
    message: null,
    success: false,
  },
  searchProducts: {
    message: [],
    totalDocs: 0,
    success: false,
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        allProducts: {
          message: action.payload.message.docs,
          totalDocs: action.payload.message.totalDocs,
          success: action.payload.success,
        },
      };
    case GET_PRODUCT_SUCCESS:
    case GET_PRODUCT_ERROR:
      return {
        ...state,
        getProduct: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case SEARCH_PRODUCTS_SUCCESS:
    case SEARCH_PRODUCTS_ERROR:
      return {
        ...state,
        searchProducts: {
          message: action.payload.message.docs,
          totalDocs: action.payload.message.totalDocs,
          success: action.payload.success,
        },
      };
    default:
      return state;
  }
}
