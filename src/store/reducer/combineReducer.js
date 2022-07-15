import { combineReducers } from "redux";
import Login from "../components/Auth/login";
import { entitesReducer } from "./../components/Entities/EntitesCombineReducer";
import { dashboardReducer } from "./../components/Dashboard/DashboardCombineReducer";

export const rootReducer = combineReducers({
  login: Login,
  entities: entitesReducer,
  dashboard: dashboardReducer,
});
