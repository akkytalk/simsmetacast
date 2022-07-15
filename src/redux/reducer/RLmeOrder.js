import * as actionType from "../types/ActionTypes";

const initialState = {
  lmeOrder: [],
  postLmeOrder: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LmeOrder = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LME_ORDER_SET_DATA:
      return {
        ...state,
        lmeOrder: action.lmeOrder,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LME_ORDER_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LME_ORDER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LME_ORDER_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LME_ORDER_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LME_ORDER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LME_ORDER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLmeOrder: action.postLmeOrder,
      };
    case actionType.UPDATE_LME_ORDER_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_ORDER_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LME_ORDER_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
