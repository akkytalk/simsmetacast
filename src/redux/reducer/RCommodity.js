import * as actionType from "../types/ActionTypes";

const initialState = {
  commodity: [],
  postCommodity: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const Commodity = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COMMODITY_SET_DATA:
      return {
        ...state,
        commodity: action.commodity,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COMMODITY_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COMMODITY_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COMMODITY_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COMMODITY_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COMMODITY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COMMODITY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCommodity: action.postCommodity,
      };
    case actionType.UPDATE_COMMODITY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COMMODITY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COMMODITY_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
