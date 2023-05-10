import { GET_TAXES_SUCCESS, GET_TAXES_ERROR } from "../actions/type";

const initialState = {
  message: null,
  success: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TAXES_SUCCESS:
    case GET_TAXES_ERROR:
      return {
        message: action.payload.message,
        success: action.payload.success,
      };
    default:
      return state;
  }
}
