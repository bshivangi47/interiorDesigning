import { PAYMENT_ERROR, PAYMENT_SUCCESS } from "../actions/type";

const initialState = {
  message: null,
  success: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PAYMENT_ERROR:
    case PAYMENT_SUCCESS:
      return {
        message: action.payload.message,
        success: action.payload.success,
      };
    default:
      return state;
  }
}
