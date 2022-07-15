import * as actionType from "../types/ActionTypes";

const initialState = {
  GBQGraph: [],
  GSQGraph: [],
  postGBQGraph: [],
  error: false,
  isLoading: false,
  isGSQLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const GBQGraph = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GBQ_GRAPH_SET_DATA:
      return {
        ...state,
        GBQGraph: action.GBQGraph,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.GSQ_GRAPH_SET_DATA:
      return {
        ...state,
        GSQGraph: action.GSQGraph,
        error: false,
        isGSQLoading: false,
      };

    case actionType.GBQ_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.GBQ_GRAPH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.GSQ_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isGSQLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.GSQ_GRAPH_LOADING:
      return {
        ...state,
        isGSQLoading: true,
        error: false,
      };
    case actionType.GBQ_GRAPH_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.GBQ_GRAPH_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_GBQ_GRAPH_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_GBQ_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postGBQGraph: action.postGBQGraph,
      };
    case actionType.UPDATE_GBQ_GRAPH_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_GBQ_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_GBQ_GRAPH_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
