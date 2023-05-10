import { BUSINESS_EMAIL_SUCCESS, BUSINESS_EMAIL_ERROR } from "../actions/type";

const initialState = {
  sendBusinessEmail: { message: null, success: false },
};
export default function (state = initialState, action) {
  switch (action.type) {
    case BUSINESS_EMAIL_SUCCESS:
    case BUSINESS_EMAIL_ERROR:
      return {
        sendBusinessEmail: {
          message: action.payload.message,
          success: action.payload.success,
        },
      };
    default:
      return state;
  }
}
