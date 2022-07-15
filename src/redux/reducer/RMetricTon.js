import * as actionType from "../types/ActionTypes";

const initialState = {
  metricTon: [],
  postMetricTon: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const MetricTon = (state = initialState, action) => {
  switch (action.type) {
    case actionType.METRIC_TON_SET_DATA:
      return {
        ...state,
        metricTon: action.metricTon,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.METRIC_TON_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.METRIC_TON_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.METRIC_TON_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.METRIC_TON_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_METRIC_TON_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_METRIC_TON_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postMetricTon: action.postMetricTon,
      };
    case actionType.UPDATE_METRIC_TON_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_METRIC_TON_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_METRIC_TON_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
