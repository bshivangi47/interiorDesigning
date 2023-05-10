import { AFFIRM_PAYMENT_SUCCESS, AFFIRM_PAYMENT_ERROR } from "../actions/type";

const initialState = {
  message: null,
  success: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case AFFIRM_PAYMENT_SUCCESS:
    case AFFIRM_PAYMENT_ERROR:
      return {
        message: action.payload.message,
        success: action.payload.success,
      };
    default:
      return state;
  }
}
