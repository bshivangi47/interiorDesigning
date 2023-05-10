import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";
import inventoryReducer from "./inventory";
import projectReducer from "./projectReducer";
import AdminReducer from "./ReducerAdmin";
import cartReducer from "./cartReducer";
import paymentReducer from "./paymentReducer";
import businessReducer from "./businessReducer";
import affirmReducer from "./affirmReducer";
import taxReducer from "./taxReducer";

const reducers = combineReducers({
  error: errorReducer,
  user: userReducer,
  inventory: inventoryReducer,
  project: projectReducer,
  admin: AdminReducer,
  cart: cartReducer,
  payment: paymentReducer,
  business: businessReducer,
  affirm: affirmReducer,
  tax: taxReducer,
});

export default reducers;
