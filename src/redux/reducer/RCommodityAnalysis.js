import * as actionType from "../types/ActionTypes";

const initialState = {
  commodityAnalysis: [],
  postCommodityAnalysis: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const CommodityAnalysis = (state = initialState, action) => {
  switch (action.type) {
    case actionType.COMMODITY_ANALYSIS_SET_DATA:
      return {
        ...state,
        commodityAnalysis: action.commodityAnalysis,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.COMMODITY_ANALYSIS_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.COMMODITY_ANALYSIS_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.COMMODITY_ANALYSIS_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.COMMODITY_ANALYSIS_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_COMMODITY_ANALYSIS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_COMMODITY_ANALYSIS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postCommodityAnalysis: action.postCommodityAnalysis,
      };
    case actionType.UPDATE_COMMODITY_ANALYSIS_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COMMODITY_ANALYSIS_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_COMMODITY_ANALYSIS_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
