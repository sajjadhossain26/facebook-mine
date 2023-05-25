import { combineReducers } from "redux";
import AuthReducer from "./auth/AuthReducer";
import LoaderReducer from "./loader/loaderReducer";

// create root reducer
const rootReducer = combineReducers({
  auth: AuthReducer,
  loader: LoaderReducer,
});

export default rootReducer;
