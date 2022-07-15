import { combineReducers } from "redux";
import city from "./city";
import country from "./country";
import state from "./state";

export const addressReducer = combineReducers({
  country: country,
  city: city,
  state: state,
});
