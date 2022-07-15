import * as actionType from "../types/ActionTypes";

const initialState = {
  longTerm: [],
  postLongTerm: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const LongTerm = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LONG_TERM_SET_DATA:
      return {
        ...state,
        longTerm: action.longTerm,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.LONG_TERM_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.LONG_TERM_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.LONG_TERM_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.LONG_TERM_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_LONG_TERM_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_LONG_TERM_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postLongTerm: action.postLongTerm,
      };
    case actionType.UPDATE_LONG_TERM_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LONG_TERM_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_LONG_TERM_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
