import * as actionType from "../types/ActionTypes";

const initialState = {
  advanceDetail: [],
  postAdvanceDetail: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const AdvanceDetail = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADVANCE_DETAIL_SET_DATA:
      return {
        ...state,
        advanceDetail: action.advanceDetail,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.ADVANCE_DETAIL_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.ADVANCE_DETAIL_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.ADVANCE_DETAIL_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.ADVANCE_DETAIL_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_ADVANCE_DETAIL_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_ADVANCE_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postAdvanceDetail: action.postAdvanceDetail,
      };
    case actionType.UPDATE_ADVANCE_DETAIL_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_ADVANCE_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_ADVANCE_DETAIL_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
