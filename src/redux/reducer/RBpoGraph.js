import * as actionType from "../types/ActionTypes";

const initialState = {
  bpoGraph: [],
  postBpoGraph: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const BpoGraph = (state = initialState, action) => {
  switch (action.type) {
    case actionType.BPO_GRAPH_SET_DATA:
      return {
        ...state,
        bpoGraph: action.bpoGraph,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.BPO_GRAPH_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.BPO_GRAPH_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.BPO_GRAPH_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.BPO_GRAPH_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_BPO_GRAPH_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_BPO_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postBpoGraph: action.postBpoGraph,
      };
    case actionType.UPDATE_BPO_GRAPH_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_BPO_GRAPH_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_BPO_GRAPH_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
