import { combineReducers } from "redux";
import Count from "./count";
import { BpoGraph, GBQGraph } from "./graph";

export const dashboardReducer = combineReducers({
  count: Count,
  bpoGraph: BpoGraph,
  GBQGraph: GBQGraph,
});
