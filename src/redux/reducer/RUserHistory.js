import * as actionType from "../types/ActionTypes";

const initialState = {
  userHistory: [],
  postUserHistory: [],
  error: false,
  isLoading: false,
  isPostLoading: false,
  isUpdateLoading: false,
};

export const UserHistory = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USER_HISTORY_SET_DATA:
      return {
        ...state,
        userHistory: action.userHistory,
        error: false,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };

    case actionType.USER_HISTORY_FAIL_DATA:
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.USER_HISTORY_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case actionType.USER_HISTORY_POST_LOADING:
      return {
        ...state,
        isPostLoading: true,
        error: false,
      };
    case actionType.USER_HISTORY_UPDATE_LOADING:
      return {
        ...state,
        isUpdateLoading: true,
        error: false,
      };
    case actionType.POST_USER_HISTORY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.POST_USER_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        postUserHistory: action.postUserHistory,
      };
    case actionType.UPDATE_USER_HISTORY_DATA_FAIL:
      return {
        ...state,
        error: action.error,
        isPostLoading: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_USER_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        isPostLoading: false,
        error: false,
        isUpdateLoading: false,
      };
    case actionType.UPDATE_USER_HISTORY_DATA_START:
      return {
        ...state,
      };

    default:
      return state;
  }
};
