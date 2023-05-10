import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_SUCCESS,
  AUTH_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CONTACT_US_SUCCESS,
  CONTACT_US_ERROR,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from "../actions/type";
const initialState = {
  token: null,
  isLoggedIn: false,
  user: null,
  Authsuccess: null,
  resetPassword: {
    message: null,
    success: null,
  },
  forgotPassword: {
    message: null,
    success: null,
  },
  contactUs: {
    message: null,
    success: null,
  },
  getUser: {
    message: null,
    success: null,
  },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CONTACT_US_SUCCESS:
    case CONTACT_US_ERROR:
      return {
        ...state,
        contactUs: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case RESET_PASSWORD_SUCCESS:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetPassword: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case FORGOT_PASSWORD_SUCCESS:
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        forgotPassword: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: action.payload.message,
        Authsuccess: action.payload.success,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.message.token);

      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.message.token,
        user: action.payload.message.user,
        Authsuccess: action.payload.success,
      };
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
        Authsuccess: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: JSON.parse(localStorage.getItem("token")),
        user: JSON.parse(localStorage.getItem("user")),
        Authsuccess: action.payload.success,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
        Authsuccess: false,
      };
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
      return {
        ...state,
        getUser: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    default:
      return state;
  }
}
