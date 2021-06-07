import { combineReducers } from "redux";
import authReducer from "./authServices/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
